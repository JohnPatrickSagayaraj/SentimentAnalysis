const express = require('express');
const router = express.Router();
const Insurance = require('../models/insurance');

router.get("", (req, res, next) => {
	const pagesize = +req.query.pagesize;
	const page = +req.query.page;
	const insuranceQuery = Insurance.find({ 'user': { $eq: req.query.id }})
	if(pagesize && page) {
		insuranceQuery.skip(pagesize * (page - 1)).limit(pagesize);
	}
	insuranceQuery.then((result) => {
	  res.status(200).send(result) }).catch((err) => {
		res.status(400).send(err) })
  
});

router.post("/calculate", (req, res, next) => {
	const insurance = new Insurance(req.body);
	insurance.save().then((result) => {
		let premium = 5000;
		age = calculateAge(req.body.age, premium);
		gender = calculateGender(req.body.gender, age);
		current = calculateCurrentHealth([req.body.hypertension, req.body.pressure, req.body.sugar, req.body.overweight], gender);
		output = calculateHabit([req.body.smooking, req.body.alcohol, req.body.exercise, req.body.drugs], current);
		res.json({ result: result, premium: output.toFixed() });
	})
})

function calculateAge(age, premium) {
	value = age/5;
	if(value > 3.6) {
		i=4;
		while(i<value) {
			if(i < 8) {
				premium = premium + (premium * (10/100));
			} else {
				premium = premium + (premium * (20/100));
			}
			i++;
		}
	}
	return premium;
}

function calculateGender(gender, premium) {
	if(gender === 'male') {
		premium = premium + (premium * (2/100));
	}
	return premium;
};

function calculateCurrentHealth(condition, premium) {
	condition.forEach((element) => {
		if(element === 'true') {
			premium = premium + (premium * (1/100));
		}
	});
	return premium;
}

function calculateHabit(habit, premium) {
	habit.forEach((element, index) => {
		if(index === 2) {
			premium = premium - (premium * (3/100));
		} else if(element === 'true') {
			premium = premium + (premium * (3/100));
		}
	});
	return premium;
}

router.put("/:id", (req, res, next) => {
  Insurance.updateOne({ "_id": req.params.id }, req.body, function(err, result) {
		if(err) {
			res.json(err);
		}
		else {
			let premium = 5000;
			age = calculateAge(req.body.age, premium);
			gender = calculateGender(req.body.gender, age);
			current = calculateCurrentHealth([req.body.hypertension, req.body.pressure, req.body.sugar, req.body.overweight], gender);
			output = calculateHabit([req.body.smooking, req.body.alcohol, req.body.exercise, req.body.drugs], current);
			res.json({ result: result, premium: output.toFixed() });
		}
	})
})

router.get("/:id", (req, res, next) => {
	Insurance.find({ "_id": req.params.id }, function(err, result) {
		  if(err) {
			  res.json(err);
		  }
		  else {
			let premium = 5000;
			age = calculateAge(req.body.age, premium);
			gender = calculateGender(req.body.gender, age);
			current = calculateCurrentHealth([req.body.hypertension, req.body.pressure, req.body.sugar, req.body.overweight], gender);
			output = calculateHabit([req.body.smooking, req.body.alcohol, req.body.exercise, req.body.drugs], current);
			res.json({ result: result[0], premium: output.toFixed() });
		  }
	})
})

router.delete("/:id", (req, res, next) => {
	Insurance.deleteOne({ "_id": req.params.id }, function(err, result) {
		  if(err) {
			res.json(err);
		  }
		  else {
			res.json(result);
		  }
	  })
  })

module.exports = router;


