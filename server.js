require("dotenv").config();

const express = require("express");
const connectDB = require("./config/connectDb");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const expressValidator = require("express-validator");

const PORT = process.env.PORT || 8000;

connectDB();

app.use(bodyParser.json());
// app.use(expressValidator());
// app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));

app.all("*", (req, res) => {
  res.status(404).json({ error: "404 Not found" });
});

mongoose.connection.once("open", () => {
  console.log(`Connected to MongoDB`);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
