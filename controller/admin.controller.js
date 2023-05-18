const User  = require("../models/admin.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require('express');
//const jwt = require('jsonwebtoken');
const { generateJwtAdmin } = require("../auth/JWT");

// Hello I am rohit singh shekhawat
// Generate a new unique UUID
const { v4: uuidv4 } = require('uuid');
const Admin = require("../models/admin.model");

exports.Signup = async (req, res) => {
  try {
    const {first_name, last_name, adminname, email, password, user_type, status } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a new unique UUID
    const userId = uuidv4();

    const newAdmin = new Admin({
      userId,
      first_name,
      last_name,
      adminname,
      email,
      password: hashedPassword, 
      user_type,
      status,
    });

    const savedAdmin = await newAdmin.save();
    console.log('Admin saved successfully:', savedAdmin);
    res.status(200).json({ code: 200, message: 'Admin Added Successfully', addAdmin: savedAdmin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: 'Failed to add Admin' });
  }
};

exports.Login = async (req, res) => {
  try {
    var { email, password } = req.body;

    var admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res.status(402).json({
        statuscode: 402,
        status: "Not Found",
        message: "Account Not Found",
        data: {},
      });
    }

    const isValid = await Admin.hashPassword(password, Admin.password);

    if (!isValid) {
      return res.status(401).json({
        statuscode: 401,
        status: "Unauthorized",
        message: "Invalid credentials",
        data: {},
      });
    }
    const { token } = await generateJwtAdmin(admin.email, admin.userId);
   // const token = jwt.sign({ email: user.email, userId: user.userId }, 'secretKey');

    return res.status(200).json({
      statuscode: 200,
      status: "OK",
      message: "Admin Logged In Successfully",
      accessToken: token,
      data: {
        userId: admin.userId,
        email: admin.email,
        first_name: admin.first_name,
        last_name: admin.last_name,

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
    const { id } = req.decoded;

    let admin = await User.findOne({ userId: id });

    admin.accessToken = "";

    await admin.save();

    return res.status(200).json({
      statuscode: 200,
      status: "OK",
      message: "Admin Logged out Successfully",
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
   