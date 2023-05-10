const { UserModel } = require("../Model/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const signupController = async (req, res) => {
  const { email, pass } = req.body;
  const saltRounds = 4;
  try {
    const existingUser = await UserModel.find({ email: email });

    if (existingUser.length > 0) {
      res.status(401).send({ message: "User already exists" });
    } else {
      bcrypt.hash(pass, saltRounds, async (err, hash) => {
        // Store hash in your password DB.

        const user = new UserModel({ email, pass: hash });
        await user.save();
        res.status(200).send({ message: "User created successfully" });
      });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const loginController = async (req, res) => {
  const { email, pass } = req.body;

  try {
    const userExist = await UserModel.findOne({ email: email });

    if (userExist) {
      bcrypt.compare(pass, userExist.pass, async (err, result) => {
        if (result) {
          res.status(200).send({
            message: "Loggedin Succesfully",
            token: jwt.sign({ userID: userExist._id }, "mock-12"),
          });
        } else {
          res.status(400).send({ message: "Invalid Password" });
        }
      });
    } else {
      res.status(400).send({ message: "Please Sign up First" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = { signupController, loginController };
