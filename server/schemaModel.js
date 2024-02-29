const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  accessToken: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const sessionSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 14, default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = { User, Session };
