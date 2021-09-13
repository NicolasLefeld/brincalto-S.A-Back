const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    role: String
  }, { collection: 'users' },
);

module.exports.userSchema = mongoose.model('userModel', userSchema);
