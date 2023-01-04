const Student = require("../model/student");
const Teacher = require("../model/teacher");
const { createError } = require("../utils/createError");

exports.addTeacher = async (req, res, next) => {
  try {
    const newTeacher = new Teacher(req.body);
    await newTeacher.save();

    const studentid = req.params.id;
    await Student.findByIdAndUpdate(studentid, {
      $push: { favTeachers: newTeacher },
    });
    res.status(201).json({
      teacher: newTeacher,
    });
  } catch (err) {
    next(createError(404, `${err.message}`));
  }
};

exports.removeTeacher = async (req, res, next) => {
  try {
    await Teacher.findByIdAndDelete(req.params.teacherId);
    await Student.findByIdAndUpdate(req.params.studentId, {
      $pull: { favTeachers: req.params.teacherId },
    });
    res.status(204).send("Teacher successfuly deleted!");
  } catch (err) {
    next(createError(400, `${err.message}`));
  }
};

exports.favTeacher = async (req, res, next) => {
  try {
  } catch (err) {}
};
