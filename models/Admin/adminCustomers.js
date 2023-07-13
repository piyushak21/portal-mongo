const mongoose = require('mongoose');
//const moment = require('moment-timezone');
const bcrypt = require('bcrypt');

// Define the schema for the User model
//const currentTimeIST = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
const userSchema = new mongoose.Schema({
  userId:              {type: String,  unique: true, required: true  },
  first_name:          {type: String,                required: true  },
  last_name:           {type: String,                required: true  },
 // full_name:           {type: String,                required: true  },
 // username:            {type: String,                required: true  },
  email:               {type: String,                required: true  },
  password:            {type: String,                required: true, },
  confirmPassword:     {type: String,                required: true, },
 // user_type:           {type: String,                required: true, },
  status:              {type: String,                default: true },
  company_name:        {type: String,                required: true, },
  address:             {type: String,                required: true, },
  state:               {type: String,                required: true, },
  city:                {type: String,                required: true, },
  pincode:             {type: String,                required: true, },
  phone:               {type: String,                required: true, },
  active:              {type: String,                 default: true  },
  resetPasswordToken:  {type: String,                 default: null  },
  resetPasswordExpires:{type: Date,                   default: null  },
  accessToken:         {type: String,                 default: null  },
  // After use this state to use activate api
  // active: { 
  //   type: Boolean,
  //   default: false 
  //   },
   
  // otpmode: { 
  //   type: Boolean, 
  //   default: false 
  // },
  created_at: { type: String, required: true },
  updated_at: { type: String, required: true },
 


  // emailToken: {
  //    type: String, 
  //    default: null
  //    },
  //    emailTokenExpires: { 
  //     type: Date, 
  //     default: null
  //    },
  // otp: {
  //   type: String, 
  //   default: null ,
  // },
});



//console.log(currentTimeIST);

// Create the User model
const   User = mongoose.model('Users', userSchema);

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
// module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
//   try {
//     console.log(inputPassword);
//     console.log(hashedPassword);
//    // const saltRounds = 10;
//     const match = await bcrypt.compare(inputPassword, hashedPassword);
//     return match;
//   } catch (error) {
//     console.error("Comparison failed", error);
//     throw new Error("Failed to compare passwords");
//   }
// };
module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    console.log(inputPassword);
    console.log(hashedPassword);
   // const saltRounds = 12 ;
    const match = await bcrypt.hash(inputPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error("Comparison failed", error);
    throw new Error("Failed to compare passwords");
  }
};

