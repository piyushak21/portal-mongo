const User  = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require('express');
//const jwt = require('jsonwebtoken');
const { generateJwt } = require("../auth/JWT");
const storage = require("node-sessionstorage");


//========Generate a new unique UUID===========//
const { v4: uuidv4 } = require('uuid');
const Customer = require("../models/customer.model");

//======================================={Sign-Up / Add/ Insert User} [START]===========================================//
exports.Signup = async (req, res) => {
  try {
    const {first_name, last_name, full_name, username, email, password, confirmPassword, user_type, status } = req.body;
    const { company_name, address, state, city, pincode, phone} = req.body;
//--------------------Check Existing Email---------------------//
    const existingCustomerEmail = await User.findOne({ email});
//--------------------Check Existing User Name-----------------//
    const existingCustomerUserName = await User.findOne({  username });
//--------------------Check Existing Phone---------------------//
    const existingCustomerPhone = await User.findOne({  phone });
    

    // if (existingCustomerEmail ) {
    //   return res.status(500).send('This Email Already Taken ');
    // }
    // else if ( existingCustomerUserName) {
    //   return res.status(500).send('This User Name Already Taken');
    // }
    // else if ( existingCustomerPhone) {
    //   return res.status(500).send('This Phone Number Already Taken');
    // }

     //---------------------Check filed's required---START-----------------------------------------//
      if  (!first_name) { 
      return res.status(400).json({ message: 'FIRST_NAME is required' });
    } else if  (!last_name) { 
      return res.status(400).json({ message: 'LAST_NAME is required' });
    } else if  (!full_name) { 
      return res.status(400).json({ message: 'FULL_NAME is required' });
    } else if  (!email) {
      return res.status(400).json({ message: 'EMAIL is required' });
    } else if  (!phone) {
      return res.status(400).json({ message: 'PHONE Numberis required' });
    } else if  (!username) {
      return res.status(400).json({ message: 'USER_NAME is required' });
    } else if  (!password) {
      return res.status(400).json({ message: 'PASSWORD is required' });
    } else if  (!confirmPassword) {
      return res.status(400).json({ message: 'CONFIRM_PASSWORD is required' });
    } else if  (!user_type) {
      return res.status(400).json({ message: 'user_type is required' });
    } else if  (!status) {
      return res.status(400).json({ message: 'status is required' });
    }  else if  (!company_name) { 
      return res.status(400).json({ message: 'COMPANY_NAME is required' });
    }  else if  (!address) { 
      return res.status(400).json({ message: 'ADDRESS is required' });
    }  else if  (!state) { 
      return res.status(400).json({ message: 'STATE is required' });
    }  else if  (!city) { 
      return res.status(400).json({ message: 'CITY is required' });
    }  else if  (!pincode) { 
      return res.status(400).json({ message: 'PINCODE is required' });
    }  else if  (!phone) { 
      return res.status(400).json({ message: 'PHONE is required' });
    }
//---------------------Check filed's required---END----------------------------------------------------//

//-------------------------Check if password and confirm password match--------------------------//
    else if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: 'Password and confirm password do not match' });
    }

//--------------------------Hash the password And Confirm Password-------------------------------//
    const hashedPassword = await User.hashPassword(password, 10);
    const confirmHashPassword = await User.hashPassword(confirmPassword,10);

    //==============Generate a new unique UUID=============//
    const userId = uuidv4();

    let code = Math.floor(100000 + Math.random() * 900000);
   
    let expiry = Date.now() + 60 * 1000 * 120; //120 mins in ms
  
    console.log('code',code);

    const newUser = new User({
      userId,
      first_name,
      last_name,
      full_name,
      username,
      email,
      password: hashedPassword, 
      confirmPassword: confirmHashPassword,
      user_type,
      status,
      company_name,
      address,
      state,
      city,
      pincode,
      phone,
      code: null,
     // created_at: new Date(),
     timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    });

    // const userdetails = new Customer({
    //   id: userId,
    //   company_name,
    //   address,
    //   state,
    //   city,
    //   pincode,
    //   phone,
    //   created_at: new Date(),
    // });

  

    // User.resetPasswordToken = code;

    // const resetPasswordToken = new User(code);
    // await resetPasswordToken.save();

    // const sendCode = await sendEmail(result.value.email, code, 1);

    // // if (sendCode.error) {
    // //   return res.status(501).json({
    // //     statuscode: 501,
    // //     status: "Error",
    // //     message: "Couldn't send verification email.",
    // //     data: {},
    // //   });
    // // }
    // result.value.emailToken = code;
    // result.value.emailTokenExpires = new Date(expiry);

    const savedUser = await newUser.save();
    console.log('User saved successfully:', savedUser);
    res.status(200).json({ code: 200, message: 'User Added Successfully', addUser: savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: 'Failed to add User' });
  }
};
//======================================={Sign-Up / Add/ Insert User} [END]=============================================//

// exports.addUserDetails = async (req, res) => {
// }

//============================================{User Login} [START]======================================================//
exports.Login = async (req, res) => {
  try {
    var { email, password } = req.body;
// ************************Upcoming update in add user login with email/username/phone**************************//

//====================1. Find if any account with that email exists in DB=====================//
    var user = await User.findOne({ email: email });
 // NOT FOUND - Throw error //
    if (!user) {
      return res.status(402).json({
        statuscode: 402,
        status: "Not Found",
        message: "Wrong Email",
        data: {},
      });
    }
 //========================2. Throw error if account is not activated===========================//
 if (!user.active) {
  return res.status(403).json({
    statuscode: 403,
    status: "Failed",
    message: "You must verify your email to activate your account",
    data: {},
  });
}
//============================All Fileds Are Mandatory================================//
    if (!email || !password) {
      return res.status(400).json({
        statuscode: 400,
        status: "Failed",
        message: "Enter All Credentials Mandatory",
        data: {},
      });
    }

//====================Paswword convert into bcrypt===========================//
    const isValid = await User.comparePasswords(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        statuscode: 401,
        status: "Unauthorized",
        message: "Wrong Password",
        data: {},
      });
    }

//=====================Generate JWT Token==========================//
    const {error, token } = await generateJwt(user.email, user.userId);
    user.accessToken = token;
   // const token = jwt.sign({ email: user.email, userId: user.userId }, 'secretKey');
   if (error) {
    return res.status(501).json({
      statuscode: 501,
      status: "Error",
      message: "Couldn't create access token. Please try again later",
      data: {},
    });
  }
  const currentTimeStamp = new Date().getTime();

  user.accessToken = token;
 // user.userIP = userIP;

  if (user.blockTimeStamp < currentTimeStamp) {
    user.userActivity = true
    //user.wrongSecondPassword = 0;
    await user.save();
  }
  await user.save();
  storage.setItem("email", user.email);

    return res.status(200).json({
      statuscode: 200, 
      status: "OK",
      message: "User Logged In Successfully",
      accessToken: token,
      data: {
        active:user.active,
        userId: user.userId,
        email: user.email,
        full_name: user.full_name

      },
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      statuscode: 500,
      status: "Error",
      message: "Couldn't login. Please try again later.",
      data: {},
    });
  }
};
//============================================{User Login} [END]========================================================//


//============================================{Forgot-Password} [START]=================================================//
exports.ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({
        statuscode: 400,
        status: "Failed",
        message: "Cannot be processed",
        data: {},
      });
    }
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      return res.send({
        statuscode: 401,
        status: "Not Found",
        message: "User Not Registered",
        data: {},
      });
    }

    let code = Math.floor(100000 + Math.random() * 900000);
    console.log('code',code);
    // let response = await sendEmail(user.email, code, 2);

    // if (response.error) {
    //   return res.status(501).json({
    //     statuscode: 501,
    //     status: "Error",
    //     message: "Couldn't send mail. Please try again later.",
    //   });
    // }

    let expiry = Date.now() + 60 * 1000 * 15;
    user.resetPasswordToken = code;
    user.resetPasswordExpires = expiry; // 15 minutes

    await user.save();

    return res.send({
      statuscode: 200,
      status: "OK",
      message: "OTP Sent To Registered Email To Reset Your Password",
    });
  } catch (error) {
    console.error("forgot-password-error", error);
    return res.status(500).json({
      statuscode: 500,
      status: "Error",
      message: error.message,
    });
  }
};
//============================================{Forgot-Password} [END]===================================================//



exports.Logout = async (req, res) => {
  try {
    const { id } = req.params;
   

    let user = await User.findOne({ userId: id });

    user.accessToken = "";

    await user.save();

    return res.status(200).json({
      statuscode: 200,
      status: "OK",
      message: "User Logged out Successfully",
      data: {},
    });
  } catch (error) {
    console.error("user-logout-error", error);
    return res.status(500).json({
      statuscode: 500,
      status: "Error",
      message: error.message,
      data: {}
    });
  }
};

exports.updateUser = async (req, res) => {
}

exports.deleteUser = async (req, res) => {

}

exports.getUser = async (req, res) => {

}

exports.getAllUser = async (req, res) => {

}


const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Hashing failed", error);
  }
};