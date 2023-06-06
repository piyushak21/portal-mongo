const express = require("express");
const VehicleRoutes = express.Router();
const VehiclesController = require("../controller/vehicles.controller");


 // Get All Vehicles Data
VehicleRoutes.get("/getAllVehicle", VehiclesController.getAllVehicles);

 // Add/Insert Vehicle By User Id
//VehicleRoutes.post("/addVehicle/:user_id", VehiclesController.addVehicle);
VehicleRoutes.post("/addVehicle", VehiclesController.addVehicle);
 
// Edit/Update Vehicle Data By UserID/ VehicleId
// VehicleRoutes.put("/editVehicle/:user_id/:vehicle_id", VehiclesController.editVehicle);
VehicleRoutes.put("/updateVehicle/:vehicle_registration", VehiclesController.updateVehicle); //  NOT Working

 // Delete Vehicle Data By Vehicle Id
 VehicleRoutes.delete("/deleteVehicle/:vehicle_id", VehiclesController.deleteVehicle);
 
 // Getting Data of Particular vehicle
 VehicleRoutes.get("/getVehicle/:userId", VehiclesController.getVehicle);

// Getting vehicle Data of particular user
VehicleRoutes.get("/user-Vehicle/:vehicle_registration", VehiclesController.getUserVehicle);

// Getting IoT Data which is not assign to any vehicle
VehicleRoutes.get("/get-IOT", VehiclesController.getIOT);

// Getting ECU Data which is not assign to any vehicle
VehicleRoutes.get("/get-ECU", VehiclesController.getECU);

// Get DMS data which is not assign to any vehicle
VehicleRoutes.get("/get-DMS", VehiclesController.getDMS);

// // Get Vehicle by trip id
// VehicleRoutes.get("/getVehicleByTripId/:id", VehiclesController.getVehicleByTripId);


 module.exports = VehicleRoutes;