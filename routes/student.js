const express = require("express");
const {
  getAllStudents,
  createStudent,
  editStudent,
  deleteStudent,
  getStudent,
  validate,
} = require("../controllers/studentController");
const router = express.Router();

router
  .route("/")
  .get(getAllStudents)
  .post(validate("createStudent"), createStudent)
  .patch(validate("editStudent"), editStudent)
  .delete(deleteStudent);

router.route("/:id").get(getStudent);

module.exports = router;
