// const mongoose = require("mongoose");
// try {
//   mongoose.connect("mongodb://localhost:27017/Ecommerce", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   });
//   console.log("Database Connected Successfully");
// } catch (err) {
//   console.log("Database Not Connected");
// }


mongoose
  .connect("mongodb://localhost:27017/Ecommerce")
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.error("Database Not Connected", err);
  });
