const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const insuranceRoutes = require('./routes/insurance');
const path = require('path');
const app = express();

app.use(bodyparser.json());
app.use(cors());

mongoose.connect('mongodb+srv://anun1425:anun1425@cluster0.p4ldk.mongodb.net/insurance?retryWrites=true&w=majority', { useNewUrlParser:true, useUnifiedTopology: true }).then(
  () => { console.log("DB connected successfully.") }
).catch(
  (err) => { console.log(err) }
);

app.use("/api/user", userRoutes);
app.use("/api/insurance", insuranceRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
})

module.exports = app;
