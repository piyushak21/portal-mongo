const User  = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require('express');
//const jwt = require('jsonwebtoken');
const { generateJwt } = require("../auth/JWT");
const storage = require("node-sessionstorage");


// Generate a new unique UUID
const { v4: uuidv4 } = require('uuid');

exports.Signup = async (req, res) => {
  try {
    const {first_name, last_name, username, email, password, user_type, status } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a new unique UUID
    const userId = uuidv4();

    const newUser = new User({
      userId,
      first_name,
      last_name,
      username,
      email,
      password: hashedPassword, 
      user_type,
      status,
    });

    const savedUser = await newUser.save();
    console.log('User saved successfully:', savedUser);
    res.status(200).json({ code: 200, message: 'User Added Successfully', addUser: savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: 'Failed to add User' });
  }
};

exports.Login = async (req, res) => {
  try {
    var { email, password } = req.body;

    var user = await User.findOne({ email: email });

    if (!user) {
      return res.status(402).json({
        statuscode: 402,
        status: "Not Found",
        message: "Account Not Found",
        data: {},
      });
    }

    const isValid = await User.hashPassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        statuscode: 401,
        status: "Unauthorized",
        message: "Invalid credentials",
        data: {},
      });
    }
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
        userId: user.userId,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,

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


