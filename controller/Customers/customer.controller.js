const express = require('express');
const Customer = require('../../models/customer.model');
//const app = express();

// exports.addUser = async (req, res) => {
//   try {
//     const existingUser = await User.findOne({ email, user_name }) 
  
//   if (existingUser) {
//     return res.status(500).send('User Already Existing');
//   }

//   const newUser = new User({
//     user_id,
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     user_name: req.body.user_name,
//     email: req.body.email,

//   })
// }
// }

exports.addCustomer = async (req, res) => {
  const { user_id } = req.params;

  try {
    const existingCustomer = await Customer.findOne({ user_id });

    if (existingCustomer) {
      return res.status(500).send('Customer Already Exists');
    }

    const newCustomer = new Customer({
      user_id,
      company_name: req.body.company_name,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      pincode: req.body.pincode,
      phone: req.body.phone,
      status: req.body.status,
      created_at: new Date(),
    });

    await newCustomer.save();

    res.status(200).send({ master_customerData: newCustomer });
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};


