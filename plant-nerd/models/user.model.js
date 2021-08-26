const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: String,
  favPlant: String,
  birthday: Date,
  firstName: String,
});

const User = model("User", UserSchema, "users");

module.exports = User;