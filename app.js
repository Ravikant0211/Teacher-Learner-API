const express = require("express");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const studentRoute = require("./routes/student");
const teacherRoute = require("./routes/teacher");
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/student", studentRoute);
app.use("/api/teacher", teacherRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status;
  const errorMessage = err.message;
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

module.exports = app;
