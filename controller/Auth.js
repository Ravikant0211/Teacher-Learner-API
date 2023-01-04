const Student = require("../model/student");
const { createError } = require("../utils/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newStudent = new Student({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newStudent.save();
    res.status(201).send("Student is created");
  } catch (err) {
    next(createError(400, `${err.message}`));
  }
};

exports.login = async (req, res, next) => {
  try {
    const student = await Student.findOne({ username: req.body.username });
    if (!student) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      student.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Invalid password or username"));
    const token = jwt.sign(
      { id: student._id, username: student.username },
      process.env.SECRET_KEY
    );

    const { password, ...others } = student._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        student: others,
      });
  } catch (err) {
    next(createError(400, `${err.message}`));
  }
};
