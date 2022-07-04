require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDb");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

connectDB();

mongoose.connection.once("open", () => {
  console.log(`Connected to MongoDB`);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
