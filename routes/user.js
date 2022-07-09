const express = require("express");
const {
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
  getUser,
  validate,
} = require("../controllers/userController");
const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(validate("createUser"), createUser)
  .patch(validate("editUser"), editUser)
  .delete(deleteUser);

router.route("/:id").get(getUser);

module.exports = router;
