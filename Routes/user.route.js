const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../Model/user.model");
const {
  signupController,
  loginController,
} = require("../Controller/user.controller");

userRouter.post("/signup", signupController);
userRouter.post("/login", loginController);

module.exports = { userRouter };
