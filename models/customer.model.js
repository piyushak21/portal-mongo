const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  user_id: {
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
  status: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
