const { body, validationResult } = require("express-validator");
const Student = require("../model/Student");

const getAllStudents = async (req, res) => {
  try {
    const result = await Student.find();
    if (!result) return res.status(204).json({ message: "No student found" });

    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const getStudent = async (req, res) => {
  try {
    if (!req?.params?.id)
      return res.status(400).json({
        message: "ID is required",
      });

    const result = await Student.findOne({ _id: req.params.id });
    if (!result)
      return res.status(204).json({
        message: `No student matches ID${req.params.id}`,
      });

    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const createStudent = async (req, res) => {
  try {
    const error = validationResult(req.body);

    if (!error.isEmpty())
      return res.status(400).json({
        error: error,
      });

    const duplicate = await Student.findOne({
      matricNumber: req.body.matricNumber,
    });
    if (duplicate)
      return res.status(409).json({ message: "matric number already exist" });

    const result = await Student.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

const editStudent = async (req, res) => {
  try {
    const error = validationResult(req.body);

    if (!error.isEmpty())
      return res.status(400).json({
        error: error,
      });

    const duplicate = await Student.findOne({
      matricNumber: req.body.matricNumber,
    });
    if (duplicate)
      return res.status(409).json({ message: "matric number already exist" });

    const result = await Student.findOneAndUpdate(
      { _id: req.body.id },
      req.body
    );
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const deleteStudent = async (req, res) => {
  try {
    if (!req?.body?.id)
      return res.status(400).json({
        message: "ID is required",
      });

    const result = await Student.findOneAndDelete({ _id: req.body.id });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const searchStudent = async (req, res) => {
  try {
    if (!req?.query?.keyword || req.query.keyword.length < 1)
      return res.status(400).json({
        message: "Keyword is required",
      });

    console.log(req.query);

    const result = await Student.find({
      $or: [
        { name: { $regex: `.*${req.query.keyword}.*` } },
        { matricNumber: { $regex: `.*${req.query.keyword}.*` } },
      ],
    }).limit(10);

    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const verifyStudent = async (req, res) => {
  try {
    if (!req?.body?.matricNumber) {
      return res.status(400).json({
        message: "matric number is required",
      });
    }

    const result = await Student.findOne({
      matricNumber: req.body.matricNumber,
    });
    if (!result) return res.status(400).json({ message: "student not found" });

    res.json(result);
  } catch (err) {
    console.log(result);
  }
};

const validate = (method) => {
  switch (method) {
    case "createStudent": {
      return [
        body("name").exists(),
        body("matricNumber").exists(),
        body("dataOfBirth").exists(),
        body("level").exists(),
        body("faculty").exists(),
        body("department").exists(),
      ];
    }

    case "editStudent": {
      return [
        body("id").exists(),
        body("name").optional(),
        body("matricNumber").optional(),
        body("dataOfBirth").optional(),
        body("level").optional(),
        body("faculty").optional(),
        body("department").optional(),
      ];
    }
  }
};

module.exports = {
  getAllStudents,
  getStudent,
  createStudent,
  editStudent,
  deleteStudent,
  searchStudent,
  verifyStudent,
  validate,
};
