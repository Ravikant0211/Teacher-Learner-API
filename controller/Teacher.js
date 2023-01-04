const Teacher = require("../model/teacher");
const { createError } = require("../utils/createError");

exports.favTeacher = async (req, res, next) => {
  try {
    const result = await Teacher.aggregate([
      {
        $group: {
          _id: "$name",
          nameCount: { $count: {} },
          avgRating: { $avg: "$rating" },
        },
      },
      {
        $sort: { nameCount: -1, avgRating: -1 },
      },
      {
        $limit: 1,
      },
    ]);
    res.send(result);
  } catch (err) {
    next(createError(400, `${err.message}`));
  }
};
