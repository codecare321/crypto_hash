const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT, MONGO_DB_URL } = require("./config/server.config");
const { registerUser } = require("./controller/User.controller");

const app = express();
const userRouter = require('./routes/index');
//middleware

app.use(bodyParser.json());

app.use("/api", userRouter);

mongoose
  .connect(MONGO_DB_URL, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
