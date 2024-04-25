const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
  city: String,
  username:{
    type:String,
    required:true,
  },
  password:{
     type:String,
     required:true,
  }
});

personSchema.pre('save',async function (next){
  const person =this;

  //Hash the password only if it has been modified (new)
  if(!person.isModified('password')) return next();
  try{
     //hash password generation
     const salt = await bcrypt.genSalt(10);
     //hash passwors
     const hashedPassword =await bcrypt.hash(person.password ,salt);
     //Override the plain password with the hashed one
     person.password =hashedPassword;
       next();
  }catch(err){
      return next(err); 
  }
})

personSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch(error) {
    throw error;
  }
}


// Create a model based on the schema
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
