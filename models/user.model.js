const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
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
  full_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true
   // unique: true,
  },
  email: {
    type: String,
    required: true
    //unique: true,
  },
  password:  {
    type: String,
    required: true,
  },
  confirmPassword:  {
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
  company_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  // code: {
  //   type: String, 
  //   default: null ,
  // },
});


// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;

// Define a static method to hash the password
// userSchema.statics.hashPassword = async function (password) {
//   const saltRounds = 10;
//   return await bcrypt.hash(password, saltRounds);
// };


// module.exports.hashPassword = async (password,confirmPassword) => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     return await bcrypt.hash(password, confirmPassword, salt);
//   } catch (error) {
//     throw new Error("Hashing failed", error);
//   }
// };
module.exports.hashPassword = async (password, confirmPassword) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const concatenatedPassword = password + confirmPassword;
    return await bcrypt.hash(concatenatedPassword, salt);
  } catch (error) {
    throw new Error("Hashing failed", error);
  }
};
module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new Error("Comparison failed", error);
  }
};

