const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fullName: String,
  userName: String,
  email: String,
  password: String,
  avatar: String 
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
