const express = require("express");
const { register, login, validate } = require("../controllers/authController");
const router = express.Router();

router.route("/").patch(validate("register"), register).post(login);

module.exports = router;
