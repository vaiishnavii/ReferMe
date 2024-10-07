const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  linkedinId: String,
  username: String,
  email: String,
  role: String, // 'seeker' or 'referrer'
});

const User = mongoose.model('User', userSchema);
module.exports = User;