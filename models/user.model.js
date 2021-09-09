const {Schema, model} = require('mongoose');

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
  profilePic: String,
  description: String,
  favPlant: String,
  birthday: Date,
  firstName: String,
  friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

const User = model('User', UserSchema, 'users');

module.exports = User;
