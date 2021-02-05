const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const Sentiment = require('../models/sentiment');
const natural = require('natural');
const aposToLexForm = require('apos-to-lex-form');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

router.post("", (req, res, next) => {
	Review.find({ "created_at": { "$gte": new Date(req.body.start_date) }, "created_at": { "$lte": new Date(req.body.end_date) }, 'user': { $eq: req.body.user } }).then((reviews) => {
		console.log('reviews', reviews);
		const analysisArr = [];
		reviews.forEach((review) => {
			const lexedReview = aposToLexForm(review.review);
			const casedReview = lexedReview.toLowerCase();
			const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');
			const { WordTokenizer } = natural;
			const tokenizer = new WordTokenizer();
			const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
			tokenizedReview.forEach((word, index) => {
				tokenizedReview[index] = spellCorrector.correct(word);
			});
			const filteredReview = SW.removeStopwords(tokenizedReview);
			const { SentimentAnalyzer, PorterStemmer } = natural;
			const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
			const analysis = analyzer.getSentiment(filteredReview);
			analysisArr.push(analysis);
		})
		const sentiment = new Sentiment({ ...req.body, reviews: analysisArr });
		sentiment.save().then((result) => {
			res.status(200).json(result);
		});
	});
});

router.get("", (req, res, next) => {
	const pagesize = +req.query.pagesize;
	const page = +req.query.page;
	const sentimentQuery = Sentiment.find({ 'user': { $eq: req.query.id } })
	if (pagesize && page) {
		sentimentQuery.skip(pagesize * (page - 1)).limit(pagesize);
	}
	sentimentQuery.then((result) => {
		res.status(200).send(result)
	}).catch((err) => {
		res.status(400).send(err)
	})
});

router.get("/reviews", (req, res, next) => {
	const pagesize = +req.query.pagesize;
	const page = +req.query.page;
	const reviewQuery = Review.find({ 'user': { $eq: req.query.id } })
	if (pagesize && page) {
		reviewQuery.skip(pagesize * (page - 1)).limit(pagesize);
	}
	reviewQuery.then((result) => {
		res.status(200).send(result)
	}).catch((err) => {
		res.status(400).send(err)
	})
});

router.post("/review", (req, res, next) => {
	const review = new Review({ ...req.body, created_at: new Date() });
	review.save().then((result) => {
		res.json(result);
	})
})

router.get("/:id", (req, res, next) => {
	Sentiment.findOne({ "_id": req.params.id }, function (err, result) {
		if (err) {
			res.json(err);
		}
		else {
			res.json(result);
		}
	})
})

router.delete("/:id", (req, res, next) => {
	Sentiment.deleteOne({ "_id": req.params.id }, function (err, result) {
		if (err) {
			res.json(err);
		}
		else {
			res.json(result);
		}
	})
})

module.exports = router;


