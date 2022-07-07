const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

router.route("/").patch(register).post(login);

module.exports = router;
