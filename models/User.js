const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 255,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  level: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)