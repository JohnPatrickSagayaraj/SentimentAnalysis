const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get("", (req, res, next) => {
	const productQuery = Product.find();
	productQuery.then((result) => {
		res.status(200).send(result)
	}).catch((err) => {
		res.status(400).send(err)
	})
});

router.get("/:id", (req, res, next) => {
	Product.findOne({ "_id": req.params.id }, function (err, result) {
		if (err) {
			res.json(err);
		}
		else {
			res.json(result);
		}
	})
})

module.exports = router;


