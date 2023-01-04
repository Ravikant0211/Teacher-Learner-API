const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  rating: Number,
});

module.exports = mongoose.model("Teacher", teacherSchema);
