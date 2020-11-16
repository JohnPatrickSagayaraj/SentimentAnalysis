const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const path = require('path');
const Vimeo = require('vimeo').Vimeo;
const multer = require('multer');
const client = new Vimeo("6a54366a88cb8efa68fa83f5377577e930fb8344", "8YbbhDOHuJnYqiQH+EjaclxDrKJ/o9R8c3hoDLQtVDE0G4kIRdYIxTtJiCw88rVXFiQCVLEJ+oWjRVNJx2gW8z8/LuvS3Gx5+kbE4WDCBJifHBWpFxQSRW6/bJpb/6DS", "c4400fabd3143a084b9024d3722f33e4");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'videos');
  },
  filename: (req, file, cb) => {
    cb(null, 'video.mp4')
  }
});

var upload = multer({storage: storage});

router.post("/upload", upload.single('uri'), (req, res, next) => {
  console.log("body111", req.body);
  var file_name = path.join(__dirname, '../videos/video.mp4');
  client.upload(
    file_name,
    {
      'name': req.body.name,
      'description': req.body.description
    },
    function (uri) {
      const course = new Course({
        name: req.body.name,
        description: req.body.description,
        createddate: new Date().toString(),
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        uri: `https://player.vimeo.com/video/${uri.split('/').pop()}`
      })

      course.save().then((result) => {
        console.log("result", result)
        res.status(200).send(result);
      })
      console.log('Your video URI is: ' + uri);
    },
    function (bytes_uploaded, bytes_total) {
      var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
      console.log(bytes_uploaded, bytes_total, percentage + '%')
    },
    function (error) {
      res.send({ error: error });
      console.log('Failed because: ' + error);
    }
  )
});

router.get("/videos", (req, res, next) => {
  const pagesize = +req.query.pagesize;
  const page = +req.query.page;
  const courseQuery = Course.find({ $and: [{ $or: [{ "startdate": { "$lte": new Date() } }, { startdate: { $eq: null }}]}, {$or: [{"enddate":{"$gte":new Date()}}, { enddate: { $eq: null }}]}, { 'users._id': { $ne: req.query.id }}]})
  if(pagesize && page) {
    courseQuery.skip(pagesize * (page - 1)).limit(pagesize);
  }
  courseQuery.then((result) => {
    console.log("result", result);
    res.status(200).send(result) }).catch((err) => {
      console.log("err", err);
      res.status(400).send(err) })
})

router.patch("/:id", (req, res, next) => {
  Course.update({ "_id": req.params.id }, { "$push": { "users": req.body } }, function(err, user) {
		if(err) {
			res.json(err);
		}
		else {
			res.json(user);
		}
	})
})

router.get("/video/:id", (req, res, next) => {
  Course.findOne({_id: req.params.id }).then((result) => { res.status(200).send(result) })
})

router.patch("/:id/comment", (req, res, next) => {
  Course.update({ "_id": req.params.id, "users._id": req.body.userid }, { "$set": { "users.$.comment": req.body.comment } }, function(err, user) {
		if(err) {
			res.json(err);
		}
		else {
			res.json(user);
		}
	})
})

function endOfMonth(date)
{
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function startOfMonth(date)
{
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

router.get("/report", (req, res, next) => {
  Course.find({"createddate": {"$gte": startOfMonth(new Date()),  "$lte": endOfMonth(new Date()) }}).then((courses) => {
    console.log("res", courses);
    const result = courses.map(course => {
      return {
        _id: course._id,
        name: course.name,
        count: course.users.length,
        comment: course.users.map((user) => {
          return user.comment
        })
      }
    })
    res.status(200).send(result);
  }).catch()
})

module.exports = router;


