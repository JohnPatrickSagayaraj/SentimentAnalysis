const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const reviewRoutes = require('./routes/review');
const productRoutes = require('./routes/product');
const path = require('path');
const app = express();

app.use(bodyparser.json());
app.use(cors());

mongoose.connect('mongodb+srv://john009:john009@cluster0.pdd5c.mongodb.net/SentimentAnalysis?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => { console.log("DB connected successfully.") }
).catch(
  (err) => { console.log(err) }
);

app.use("/api/user", userRoutes);
app.use("/api/sentiment", reviewRoutes);
app.use("/api/products", productRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
})

module.exports = app;
