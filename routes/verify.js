const express = require("express");
const { verifyStudent } = require("../controllers/studentController");
const router = express.Router();

router.route("/").post(verifyStudent);

module.exports = router;
