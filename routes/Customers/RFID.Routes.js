const express = require("express");
const RFIDRoutes = express.Router();
const RFIDController = require("../../controller/Customers/DriverRFID.controller");


// Add/Insert Contacts Data
RFIDRoutes.post("/add-RFID", RFIDController.AddRFID);


module.exports = RFIDRoutes;