const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
  actualName: { type: String }, // Add the actualName field
  profilePicture: { type: String }, // Add the profilePicture field
  description: { type: String }, // Add the description field
  token: {
    type: String,
  },
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;
