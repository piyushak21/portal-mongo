const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  customerId: 
  { type: String, required: true },
  vehicleId: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  gender: { type: String, required: true },
  license_No: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  DOB: { type: String, required: true },
  rfid: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: String,
    required: true,
  },
  modifiedAt: {
    type: Date,
    default: null,
  },
  modifiedBy: {
    type: String,
    default: null,
  },
});

const driversModel = mongoose.model("drivers_master", driverSchema);

module.exports = { driversModel };
