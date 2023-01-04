const express = require("express");
const { verifyUser } = require("../utils/verifyUser");
const { addTeacher, removeTeacher } = require("../controller/Student");
const router = express.Router();

router.post("/:id", verifyUser, addTeacher);
router.delete("/:studentId/:teacherId", verifyUser, removeTeacher);

module.exports = router;
