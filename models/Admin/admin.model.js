const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the Admin model
const adminSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String, 
    required: true,  
  },
  admin_name: {
    type: String,
    required: true
   // unique: true,
  },
  email: {
    type: String,
    required: true
    //unique: true,
  },
  password: {
    type: String, 
    required: true,
  },
  user_type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

// Define a static method to hash the password
adminSchema.statics.hashPassword = async function (password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);

// Export the Admin model
module.exports = Admin;

