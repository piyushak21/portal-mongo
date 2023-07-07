const  driversModel  = require("../../models/Customers/Driver.model");
const  VehicleModel = require("../../models/Customers/vehicles.model");
const express = require('express');
app = express();

const bodypar = require("body-parser");

app.use(bodypar.urlencoded({ extended: true }));
app.use(bodypar.json());

//3000+51+5500+3729+2

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
      const { startDate, endDate } = req.body;
  
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1);
  
      const drivers = await driversModel.find({
        createdAt: { $gte: start, $lt: end },
      });
  
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
            message: "Vehical Not Found",
            data: {}, 
        });
}
return res.status(200).json({
    statuscode: 200,
    status: "ok",
    message: "Vehical Get Succesfully",
    data: {
        data
    },
});
} catch (error) {
console.log("Failed to Get Vehical", error);
return res.status(500).json({
    statuscode: 500,
    status: "Error",
    message: error.message,
    data: {},
})
}
};


