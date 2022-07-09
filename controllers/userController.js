const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const result = await User.find();
  if (!result) return res.status(204).json({ message: "No user found" });
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({
      message: "ID is required",
    });

  const result = await User.findOne({ _id: req.params.id });

  if (!result)
    return res.status(204).json({
      message: `No student matches ID${req.params.id}`,
    });

  res.send(result);
};

const createUser = async (req, res) => {
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

const editUser = async (req, res) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty())
      return res.status(422).json({
        error: error.array(),
      });

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
    const result = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body, hash }
    );

    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!req?.body?.id)
      return res.status(400).json({
        message: "ID is required",
      });

    const result = await User.findOneAndDelete({ _id: req.body.id });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("email", "Invalid Email").exists().isEmail(),
        body("password", "Password is required").exists(),
        body("name").exists(),
        body("dataOfBirth").exists(),
        body("educationLevel").exists(),
        body("position").exists(),
        body("department").exists(),
        body("staffNo").exists(),
      ];
    }

    case "editUser": {
      return [
        body("id").exists(),
        body("email", "Invalid Email").optional().isEmail(),
        body("password", "Password is required").optional(),
        body("name").optional(),
        body("dataOfBirth").optional(),
        body("educationLevel").optional(),
        body("position").optional(),
        body("department").optional(),
        body("staffNo").optional(),
      ];
    }
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  editUser,
  deleteUser,
  validate,
};
