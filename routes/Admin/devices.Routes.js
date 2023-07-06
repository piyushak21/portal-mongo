const express = require("express");
const DevicesRoutes = express.Router();
const DevicesController = require("../../controller/Admin/devices.controller");


// Get All Devices Data
DevicesRoutes.get("/get-all-devices",DevicesController.GetAllDevices);

// Add/Insert Devices Data
DevicesRoutes.post("/add-Device", DevicesController.AddDevice);

// Edit/update Device Data By Id
DevicesRoutes.put("/update-Device/:id", DevicesController.UpdateDevice);

// Delete Device Data By Id
DevicesRoutes.delete("/delete-Device/:id", DevicesController.DeleteDevice);

// // Get User Devices Data By User Id
// DevicesRoutes.get("/get-User-Device/:user_id", DevicesController.GetDevices);

// Get Device data
DevicesRoutes.get("/get-Device/:id", DevicesController.getDeviceById);

// Get IOT Devices Data (Not Use)
//DevicesRoutes.get("/get-iot-devices",DevicesController.getIOTDevice);

DevicesRoutes.get('/devices/:deviceType', DevicesController.getDevicesByType);

//DevicesRoutes.get("/get-globalSearch",DevicesController.globalSearch);

module.exports = DevicesRoutes;
