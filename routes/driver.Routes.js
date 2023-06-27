const express = require("express");
const DriverRoutes = express.Router();
const DriverController = require("../controller/Drivers.controller");


DriverRoutes.get("/get-all-drivers", DriverController.getAllDrivers);

DriverRoutes.get("/get-drivers/:customerId", DriverController.getDriversById);

DriverRoutes.post("/add-driver", DriverController.addDriver);

DriverRoutes.put("/edit-driver/:driverId", DriverController.editDriver);

DriverRoutes.delete("/delete-driver/:driverId", DriverController.deleteDriver);

module.exports = DriverRoutes;
