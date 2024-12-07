const express = require("express");
const { registerUser, getUser } = require("../controller/User.controller");
const router = express.Router();

router.post("/register", registerUser);

router.get("/getUser/:id", getUser);

module.exports = router;
