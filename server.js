require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDb");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", require("./routes/auth"));

app.all("*", (req, res) => {
  res.status(404).json({ error: "404 Not found" });
});

mongoose.connection.once("open", () => {
  console.log(`Connected to MongoDB`);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
