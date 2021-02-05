const User = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post("/login", (req, res, next) => {
  let fetcheduser;
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(401).json({ err: "Invalid login credential" })
    }
    fetcheduser = user;
    return bcrypt.compare(req.body.password, user.password)
  }).then((result) => {
    if (!result) {
      return res.status(401).json({ err: "Invalid login credential" })
    }
    const token = jwt.sign(
      { email: fetcheduser.email, userId: fetcheduser._id },
      "secret this should be longer",
      { expiresIn: '1h' }
    )
    res.status(200).json({
      token: token,
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
      password: hash
    });
    user.save().then((users) => {
      res.status(201).json(users)
    }).catch((err) => { res.status(500).json(err) });
  })
})

module.exports = router;
