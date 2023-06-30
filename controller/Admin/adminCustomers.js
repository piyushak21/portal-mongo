const User  = require("../../models/Customers/user.model");
const bcrypt = require("bcrypt");
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

const { v4: uuidv4 } = require('uuid');

exports.userSignup = async (req, res) => {
    try {
  
      const {first_name, last_name, full_name, username, email, password, confirmPassword, user_type, status } = req.body;
      const { company_name, address, state, city, pincode, phone} = req.body;
  //--------------------Check Existing Email---------------------//
      const existingCustomerEmail = await User.findOne({ email}); 
  //--------------------Check Existing User Name-----------------//
      const existingCustomerUserName = await User.findOne({  username });
  //--------------------Check Existing Phone---------------------//
      const existingCustomerPhone = await User.findOne({  phone });
      
  
      if (existingCustomerEmail ) {
        return res.status(500).send('This Email Already Taken ');
      }
      else if ( existingCustomerUserName) {
        return res.status(500).send('This User Name Already Taken');
      }
      else if ( existingCustomerPhone) {
        return res.status(500).send('This Phone Number Already Taken');
      }
  
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
      const id = uuidv4();
     // const userId = id();
  
      let code = Math.floor(100000 + Math.random() * 900000);
     
      let expiry = Date.now() + 60 * 1000 * 120; //120 mins in ms
  
      //const sendCode = await sendEmail(email, code, 1);
    
      console.log('code',code);
  
      const newUser = new User({
        userId: id,
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
      //  timestamps: {
      //   createdAt: "createdAt",
      //   updatedAt: "updatedAt",
      // },
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
  
  
      const savedUser = await newUser.save();
      console.log('User saved successfully:', savedUser);
      res.status(200).json({ code: 200, message: 'User Added Successfully', addUser: savedUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ code: 500, message: 'Failed to add User' });
    }
  };

exports.userGet = async (req, res) => {
    try{
       // const { user_id } = req.body
        const data = await User.find({});
        totalCount = data.length;
        if (totalCount > 0) {
        // if(!device){

        return res.status(200).json({
            statuscode: 200,
            status: 'OK',
            TotalCount: totalCount,
            message: 'User Get Successfull',
            data
          });
        // }
      }
          } catch (err) {
            console.log(err, "error in Vehicle Data")
          }
    
  };
