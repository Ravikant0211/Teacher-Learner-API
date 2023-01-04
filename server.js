const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Congratulations! You are connected to Database.`);
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on the ${PORT} port.`);
});
