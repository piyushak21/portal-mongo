const express = require('express');
const ATRoutes = express.Router();
const ATController = require("../../controller/Admin/AnalyticsThreshold.controller");


// AT    Score Routes //
ATRoutes.post("/AddAnalytics",ATController.AddAnalytics);

// AT Incentive Routes //
ATRoutes.post("/AddIncentive", ATController.AddIncentive);

// AT Accident Routes //
ATRoutes.post("/AddAccident",ATController.AddAccident);

// AT LeaderShip Board Routes //
ATRoutes.post("/AddLB",ATController.AddLB);

// AT Halt Routes //
ATRoutes.post("/Addhalt",ATController.AddHalt);


module.exports = ATRoutes;