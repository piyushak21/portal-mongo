const Vehicle = require("../models/vehicles.model");
const express = require("express");
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
const { v4: uuidv4 } = require('uuid');


// Insert/Add Vehicle
// exports.addVehicle = (req, res) => {
//   const { user_id } = req.params;

//   const checkQuery = {
//     vehicle_registration: req.body.vehicle_registration
//   };

//   Vehicle.findOne(checkQuery, (err, data) => {
//     if (err) {
//       res.status(500).send({ Error: err });
//     } else {
//       if (data) {
//         res.status(500).send({ Error: "Vehicle Already Exists" });
//       } else {
//         if (req.body.dms && req.body.iot == null && req.body.ecu == null) {
//           const addData = {
//             user_id,
//             vehicle_name: req.body.vehicle_name,
//             vehicle_registration: req.body.vehicle_registration,
//             dms: req.body.dms,
//             featureset: 1,
//             status: req.body.status,
//             created_at: new Date()
//           };

//           Vehicle.create(addData, (err, data) => {
//             if (err) {
//               res.status(500).send({ Error: err });
//             } else {
//               res.status(200).send({ addData: data });
//             }
//           });
//         } else if (req.body.dms == null && req.body.iot && req.body.ecu) {
//           const addData = {
//             user_id,
//             vehicle_name: req.body.vehicle_name,
//             vehicle_registration: req.body.vehicle_registration,
//             ecu: req.body.ecu,
//             iot: req.body.iot,
//             featureset: 1, 
//             status: req.body.status,
//             created_at: new Date()
//           };

//           Vehicle.create(addData, (err, data) => {
//             if (err) {
//               res.status(500).send({ Error: err });
//             } else {
//               res.status(200).send({ addData: data });
//             }
//           });
//         } else {
//           const addData = {
//             user_id,
//             vehicle_name: req.body.vehicle_name,
//             vehicle_registration: req.body.vehicle_registration,
//             ecu: req.body.ecu,
//             iot: req.body.iot,
//             dms: req.body.dms,
//             featureset: 1,
//             status: req.body.status,
//             created_at: new Date()
//           };

//           Vehicle.create(addData, (err, data) => {
//             if (err) {
//               res.status(500).send({ Error: err });
//             } else {
//               res.status(200).send({ addData: data });
//             }
//           });
//         }
//       }
//     }
//   });
// };


// Insert/Add Vehicle
exports.addVehicle = async (req, res) => {
   // const { user_id } = req.params;
  

  // Generate a new unique UUID
  const userId = uuidv4();

    const checkQuery = {
      vehicle_registration: req.body.vehicle_registration
    };
  
    try {
      const existingVehicle = await Vehicle.findOne(checkQuery).exec();
  
      if (existingVehicle) {
        res.status(500).send({ Error: "Vehicle Already Exists" });
      } else {
        let addData = {
            userId, // Assuming this is the correct field name for the user ID
          vehicle_name: req.body.vehicle_name,
          vehicle_registration: req.body.vehicle_registration,
          featureset: 1,
          status: req.body.status,
          created_at: new Date()
        };
  
        if (req.body.dms && req.body.iot == null && req.body.ecu == null) {
          addData.dms = req.body.dms;
        } else if (req.body.dms == null && req.body.iot && req.body.ecu) {
          addData.ecu = req.body.ecu;
          addData.iot = req.body.iot;
        } else {
          addData.ecu = req.body.ecu;
          addData.iot = req.body.iot;
          addData.dms = req.body.dms;
        }
  
        const newVehicle = await Vehicle.create(addData);
        res.status(200).send({ addData: newVehicle });
      }
    } catch (err) {
      res.status(500).send({ Error: err.message });
    }
  };
  
// Getting Data of Particular vehicle
exports.getAllVehicles = async (req, res) => {
    try{
       // const { user_id } = req.body
        const data = await Vehicle.find({});
        return res.status(200).json({
            statuscode: 200,
            status: 'OK',
            message: 'Vehicle Data',
            data
          });
          } catch (err) {
            console.log(err, "error in Vehicle Data")
          }
  };

// Get Vehicle Data By Id
exports.getVehicle = async (req, res) => {
    try {
      const { userId } = req.params;
      const data = await Vehicle.findOne({ userId });
      return res.status(200).json({
        statusCode: 200,
        status: 'OK',
        message: 'Vehicle Data',
        data
      });
    } catch (err) {
      console.log(err, 'error in Vehicle Data');
      return res.status(500).json({
        statusCode: 500,
        status: 'Internal Server Error',
        message: 'An error occurred while retrieving vehicle data',
        error: err
      });
    }
  };
  