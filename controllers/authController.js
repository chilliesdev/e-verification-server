const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const register = async (req, res) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error.array(),
      });
    }

    const { email, password, staffNo } = req.body;

    if (await User.findOne({ email }).exec()) {
      return res.status(409).json({
        message: "email already exists",
      });
    }

    if (await User.findOne({ staffNo }).exec()) {
      return res.status(409).json({
        message: "staff number already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const result = await User.create({ ...req.body, hash });

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error.array(),
      });
    }
    const { email, password } = req.body;

    // check if user exist
    const user = await User.findOne({ email }).exec();
    if (!user) return res.sendStatus(401);

    // Encrypt password
    const match = await bcrypt.compare(password, user.hash);
    if (!match) return res.sendStatus(401);

    // remove password
    delete user.hash;

    const accessToken = jwt.sign(
      { userInfo: user },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ accessToken });
  } catch (err) {
    console.log(err);
  }
};

const validate = (method) => {
  switch (method) {
    case "register": {
      return [
        body("email", "Invalid Email").exists().isEmail(),
        body("password", "Password is required").exists(),
        body("name").exists(),
        // body("dataOfBirth").exists().isDate(),
        body("dataOfBirth").exists(),
        body("educationLevel").exists(),
        body("position").exists(),
        body("department").exists(),
        body("staffNo").exists(),
      ];
    }

    case "login": {
      return [
        body("email", "Invalid Email").exists().isEmail(),
        body("password", "Password is required").exists(),
      ];
    }
  }
};

module.exports = { register, login, validate };
