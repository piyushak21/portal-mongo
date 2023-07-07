const Admin = require("../../models/Admin/admin.model");
const bcrypt = require("bcrypt");
const express = require('express');
const app = express();
const { generateJwtAdmin } = require("../../auth/JWT");
// var cookieSession = require('cookie-session');
 const cookieParser = require("cookie-parser");
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
var bodyParser = require('body-parser');

// const path = require("path");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

const { v4: uuidv4 } = require('uuid');


//======================={Admin Signup START}======================//
exports.Signup = async (req, res) => {
  try {
    const {first_name, last_name, admin_name, email, password, status } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a new unique UUID
    const userId = uuidv4();

    const newAdmin = new Admin({
      userId,
      first_name,
      last_name,
      admin_name,
      email,
      password: hashedPassword, 
     // user_type,
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
//======================={Admin Signup END}=======================// 

// exports.Login = async (req, res) => {
//   try {
//     //let token=req.cookies.auth;
//     var { email, password } = req.body;

//     var admin = await Admin.findOne({ email: email });

//     if (!admin) {
//       return res.status(402).json({
//         statuscode: 402,
//         status: "Not Found",
//         message: "Account Not Found",
//         data: {},
//       });
//     }

//     const isValid = await Admin.hashPassword(password, Admin.password);

//     if (!isValid) {
//       return res.status(401).json({
//         statuscode: 401,
//         status: "Unauthorized",
//         message: "Invalid credentials",
//         data: {},
//       });
//     }
//     const { token } = await generateJwtAdmin(admin.email, admin.userId);
//     admin.accessToken = token;
//    // const token = jwt.sign({ email: user.email, userId: user.userId }, 'secretKey');

//     return res.status(200).json({ 
//       statuscode: 200,
//       status: "OK",
//       message: "Admin Logged In Successfully",
//       accessToken: token,
//       data: {
//         userId: admin.userId,
//         email: admin.email,
//         first_name: admin.first_name,
//         last_name: admin.last_name,

//       },
//     });
//   } catch (err) {
//     console.error("Login error", err);
//     return res.status(500).json({
//       statuscode: 500,
//       status: "Error",
//       message: "Couldn't login. Please try again later.",
//       data: {},
//     });
//   }
// };

// exports.Logout = async (req, res) => {
//   try {
//     const { id } = req.params;

//     let admin = await User.findOne({ userId: id });

//     admin.accessToken = "";

//     await admin.save();

//     return res.status(200).json({
//       statuscode: 200,
//       status: "OK",
//       message: "Admin Logged out Successfully",
//       data: {},
//     });
//   } catch (error) {
//     console.error("user-logout-error", error);
//     return res.status(500).json({
//       statuscode: 500,
//       status: "Error",
//       message: error.message,
//       data: {}
//     });
//   }
// };

//======================={Admin Login  Start}====================//
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res.status(402).json({
        statuscode: 402,
        status: 'Not Found',
        message: 'Account Not Found',
        data: {},
      });
    }

    const isValid = await Admin.hashPassword(password, admin.password);

    if (!isValid) {
      return res.status(401).json({
        statuscode: 401,
        status: 'Unauthorized',
        message: 'Invalid credentials',
        data: {},
      });
    }

    const { token } = await generateJwtAdmin(admin.email, admin.userId);
    admin.accessToken = token;

   // res.cookie('auth', token, { httpOnly: true }); // Set the 'auth' cookie

    return res.status(200).json({ 
      statuscode: 200,
      status: 'OK',
      message: 'Admin Logged In Successfully',
      accessToken: token,
      data: {
        userId: admin.userId,
        email: admin.email,
        first_name: admin.first_name,
        last_name: admin.last_name,
      },
    });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({
      statuscode: 500,
      status: 'Error',
      message: "Couldn't login. Please try again later.",
      data: {},
    });
  }
};
//======================={Admin Login  END}======================//

//======================={Admin Logout START=====================//
exports.Logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
        return token.token != req.token;
    });
    await req.user.save();
    res.json({ message: "User disconnected" });
} catch (error) {
    res.status(500).send(error);
}
}
//======================={Admin Logout END=======================//
// exports.Logout = async (req, res) => {
//   try {
//     const { id } = req.params;

//     let admin = await User.findOne({ userId: id });

//     admin.accessToken = "";

//     await admin.save();

//     return res.status(200).json({
//       statuscode: 200,
//       status: "OK",
//       message: "Admin Logged out Successfully",
//       data: {},
//     });
//   } catch (error) {
//     console.error("user-logout-error", error);
//     return res.status(500).json({
//       statuscode: 500,
//       status: "Error",
//       message: error.message,
//       data: {}
//     });
//   }
// };


