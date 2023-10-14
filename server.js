const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRouter");
const verify = require("./routes/verify.route");

const mongoose = require("mongoose");
const env = require('dotenv').config()
const PORT = process.env.PORT || 8081;
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
app.use("/api/user", userRoutes);
app.use("/", verify);



app.listen(8081, () => {
  console.log("server started on port 5000");
});