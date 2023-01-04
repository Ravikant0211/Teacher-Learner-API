const express = require("express");
const { favTeacher } = require("../controller/Teacher");
const router = express.Router();

router.get("/", favTeacher);

module.exports = router;
