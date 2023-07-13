const  driversModel  = require("../../models/Customers/Driver.model");
const  VehicleModel = require("../../models/Customers/vehicles.model");
const reportsModel = require("../../models/Customers/Reports.model")
const express = require('express');
app = express();

const bodypar = require("body-parser");

app.use(bodypar.urlencoded({ extended: true }));
app.use(bodypar.json());



exports.getAllDriversReports1 = async (req, res) => {
try {
   // const { Driver_id } = req.params;
    var drivers = await driversModel.find({});
    if(!drivers) {
        return res.status(400).json({
            statuscode: 400,
            status: "Failed",
            message: "Driver Not Found",
            data: {}, 
        });
    }
    return res.status(200).json({
        statuscode: 200,
        status: "ok",
        message: "Driver Get Succesfully",
        data: {
            drivers
        },
    });
} catch (error) {
    console.log("Failed to Get Driver", error);
    return res.status(500).json({
        statuscode: 500,
        status: "Error",
        message: error.message,
        data: {},
    })
}
};

exports.getAllDriversReports = async (req, res) => {
    try {
    const {tripId} = req.params;
    
      //const { startDate, endDate } = req.body;
  
      // const start = new Date(startDate);
      // const end = new Date(endDate);
      // end.setDate(end.getDate() + 1);
      console.log(tripId);
      const drivers = await reportsModel.find({
        trip_id: tripId
       // createdAt: { $gte: start, $lt: end },/
       
      });
      totalCount = drivers.length;
      if (!drivers) {
        return res.status(400).json({
          statuscode: 400,
          status: "Failed",
          message: "Driver Not Found",
          data: {},
        });
      }
  
      return res.status(200).json({
        statuscode: 200,
        status: "ok",
        TotalCount: totalCount,
        message: "Drivers Retrieved Successfully",
        data: {
          drivers,
        },
      });
    } catch (error) {
      console.log("Failed to Get Drivers", error);
      return res.status(500).json({
        statuscode: 500,
        status: "Error",
        message: error.message,
        data: {},
      });
    }
  };
  
exports.getAllVehicalReports = async (req, res) => {
try{

    const data = await VehicleModel.find({});
    if(!data) {
        return res.status(400).json({
            statuscode: 400,
            status: "Failed",
            message: "Vehicle Not Found",
            data: {}, 
        });
}
return res.status(200).json({
    statuscode: 200,
    status: "ok",
    message: "Vehicle Get Succesfully",
    data: {
        data
    },
});
} catch (error) {
console.log("Failed to Get Vehicle", error);
return res.status(500).json({
    statuscode: 500,
    status: "Error",
    message: error.message,
    data: {},
})
}
};


                 