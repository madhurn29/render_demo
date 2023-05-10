const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    email: String,
    pass: String,
    confirmPass: String,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
