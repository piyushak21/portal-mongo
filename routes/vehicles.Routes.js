const express = require("express");
const VehicleRoutes = express.Router();
const VehiclesController = require("../controller/vehicles.controller");


 // Get All Vehicles Data
VehicleRoutes.get("/getAllVehicle", VehiclesController.getAllVehicles);

 // Add/Insert Vehicle By User Id
//VehicleRoutes.post("/addVehicle/:user_id", VehiclesController.addVehicle);
VehicleRoutes.post("/addVehicle", VehiclesController.addVehicle);
 
// // Edit/Update Vehicle Data By UserID/ VehicleId
// VehicleRoutes.put("/editVehicle/:user_id/:vehicle_id", VehiclesController.editVehicle);

// // Delete Vehicle Data By Vehicle Id
// VehicleRoutes.delete("/deleteVehicle/:vehicle_id", VehiclesController.deleteVehicle);

 // Getting Data of Particular vehicle
 VehicleRoutes.get("/getVehicle/:userId", VehiclesController.getVehicle);

// // Getting vehicle Data of particular user
// VehicleRoutes.get("/user-Vehicle/:user_id", VehiclesController.getusersVehicle);

// // Getting IoT Data which is not assign to any vehicle
// VehicleRoutes.get("/get-IOT/:user_id", VehiclesController.getIoT);

// // Getting ECU Data which is not assign to any vehicle
// VehicleRoutes.get("/get-ECU/:user_id", VehiclesController.getECU);

// // Get DMS data which is not assign to any vehicle
// VehicleRoutes.get("/get-DMS/:user_id", VehiclesController.getDMS);

// // Get Vehicle by trip id
// VehicleRoutes.get("/getVehicleByTripId/:id", VehiclesController.getVehicleByTripId);


 module.exports = VehicleRoutes;