const User = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var nodemailer = require("nodemailer");
const router = express.Router();

var smtpTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: "meenuswathi1406ece",
    pass: "9952361333"
  }
});

var rand,mailOptions,host,link;

router.post("/login", (req, res, next) => {
  let fetcheduser;
  User.findOne({ email: req.body.email }).then((user) => {
    if(!user)
      {
        return res.status(401).json({ err: "Invalid login credential" })
      }
    if(!user.is_confirmed)
      {
        return res.status(401).json({ err: "Please confirm the email before you login." })
      }
    fetcheduser = user;
    return bcrypt.compare(req.body.password, user.password) }).then((result) => {
      if(!result)
      {
        return res.status(401).json({ err: "Invalid login credential" })
      }
      const token = jwt.sign(
        { email: fetcheduser.email, userId: fetcheduser._id },
        "secret this should be longer",
        { expiresIn: '1h' }
      )
      res.status(200).json({
        token: token,
        is_admin: fetcheduser.is_admin,
        userId: fetcheduser._id,
        username: fetcheduser.username,
        expiresIn: 3600
      })
    }).catch((err) => {
    res.status(401).json({ err: "Invalid login credential" })
  });
})

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      is_admin: req.body.is_admin,
      password: hash
    });
    user.save().then((users) => {
      rand = Math.floor((Math.random() * 100) + 54);
      link = req.protocol+"://"+req.get('host')+"/api/user/verify?id="+rand+"&email="+user.email;
      mailOptions={
        to : req.body.email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
      }
      console.log(mailOptions);
      smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
          console.log(error);
          res.end("error");
        }
        else{
          console.log("Message sent: " + response.message);
          res.end("sent");
        }
      });
      res.status(201).json(users)
    }).catch((err) => { res.status(500).json(err) });
  })
})

router.get("/verify", function(req,res) {
  console.log(req.protocol+"://"+req.get('host'));
  console.log("rand", rand);
  if(req.query.id==rand)
  {
    console.log("email", req.query.email);
    User.updateOne({ email: req.query.email }, { $set: { is_confirmed: true }}).then(() => {
      console.log("email is verified");
      url = req.protocol+"://"+req.get('host') + "/login"
      res.end(`<h1>Your email is successfully verified. Please <a href=${url}>Click</a> to login.</h1>`);
     }
    );
  }
  else
  {
    console.log("email is not verified");
    res.end("<h1>Bad Request</h1>");
  }
});

router.patch("/:id", (req, res, next) => {
  User.update({ "_id": req.params.id }, { "$push": { "courses": req.body } }, function(err, user) {
		if(err) {
			res.json(err);
		}
		else {
			res.json(user);
		}
	})
})

router.patch("/:id/comment", (req, res, next) => {
  User.update({ "_id": req.params.id, "courses._id": req.body.courseid }, { "$set": { "courses.$.comment": req.body.comment } }, function(err, user) {
		if(err) {
			res.json(err);
		}
		else {
			res.json(user);
		}
	})
})

router.get("/:id", (req, res, next) => {
  const pagesize = +req.query.pagesize;
  const page = +req.query.page;
  const userQuery = User.find({ $and: [{ $or: [{ "courses.startdate": { "$lte": new Date() } }, { "courses.startdate": { $eq: null }}]}, {$or: [{"courses.enddate":{"$gte":new Date()}}, { "courses.enddate": { $eq: null }}]}, { _id: req.params.id }]}, { courses: { $slice: [pagesize * (page - 1), pagesize] }});
  userQuery.then((result) => { res.status(200).send(result) })
})

module.exports = router;
