const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const {createTokenforUser,validateToken}=require("../services/authentication")

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Trims whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // Converts email to lowercase
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: '', // Default profile picture or URL to a standard image
  },
  bio: {
    type: String,
    default: '',
  },
  roles: [{
    type: String,
    enum: ['admin', 'editor', 'subscriber'],
    default: 'subscriber',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare provided password with the hashed password in the database
userSchema.methods.comparePassword =function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
