const express = require("express");
const ReportsRoutes = express.Router();
const ReportsController = require("../../controller/Customers/Reports.controller");


ReportsRoutes.get("/get-all-driverReports/:tripId", ReportsController.getAllDriversReports);

ReportsRoutes.get("/get-all-vehicalReports", ReportsController.getAllVehicalReports);

module.exports = ReportsRoutes;