const mongoose = require('mongoose')

const orangSchema = new mongoose.Schema({
  prefix: {
    type: String,
    required: true,
    enum: ['kak', 'bu', 'pak'],
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    min: 3,
    max: 50,
    lowercase: true,
    unique: true,
    trim:true
  },
  status: {
    type: Array,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('orang', orangSchema)