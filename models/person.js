const mongoose = require('mongoose');

// Define the schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true, // Ensures mobile number is unique
  },
  occupation: String,
  city: String
});

// Create a model based on the schema
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
