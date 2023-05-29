const express = require("express");
const DevicesRoutes = express.Router();
const DevicesController = require("../controller/devices.controller");


// Get All Devices Data
DevicesRoutes.get("/get-all-devices",DevicesController.GetAllDevices);

// Add/Insert Devices Data
DevicesRoutes.post("/add-Device", DevicesController.Device);

// Edit/update Device Data By Id
DevicesRoutes.put("/update-Device/:id", DevicesController.UpdateDevice);

// Delete Device Data By Id
DevicesRoutes.delete("/delete-Device/:id", DevicesController.DeleteDevice);

// // Get User Devices Data By User Id
// DevicesRoutes.get("/get-User-Device/:user_id", DevicesController.GetDevices);

// Get Device data
DevicesRoutes.get("/get-Device/:id", DevicesController.getDeviceById);

module.exports = DevicesRoutes;
