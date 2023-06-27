const Vehicle = require("../models/vehicles.model");
const express = require("express");
const app = express();

const bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
const { v4: uuidv4 } = require('uuid');

 
// Adding vehicle Into DataBase By Store Procedure -- START//
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
          created_by: new Date(),
         // created_by: 'admin123', // Provide the created_by value
          modified_by:  new Date(), // Provide the modified_by value
          updated_by: new Date(), // Provide the updated_by value
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
// Adding vehicle Into DataBase By Store Procedure -- END//

// Getting All Vehicle Data  --START//
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
// Getting All Vehicle Data  --END//

// Get Vehicle Data By User Id -- START //
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
// Get Vehicle Data By User Id  -- END//

// Get Vehicle Data By Vehicle Id -- START //
exports.getUserVehicle = async (req, res) => {
try {
  const { vehicle_registration } = req.params
  const data = await Vehicle.findOne({vehicle_registration });
  return res.status(200).json({
    statusCode: 200,
    status: 'OK',
    message: 'Vehicle Data',
    data
  }); 
}catch (err) {
  console.log(err, 'error in Vehicle Data');
  return res.status(500).json({
    statusCode: 500,
    status: 'Internal Server Error',
    message: 'An error occured While retrieving Vehicle data',
    error: err
  });
}
};
// Get Vehicle Data By Vehicle Id  -- END//

// Getting IoT Data which is not assign to any vehicle -- START //
exports.getIOT = async (req, res) => {
  try {
    const { user_id } = req.params;

    const iotData = await Vehicle.find({
      user_id,
      iot: { $exists: true }
    });

    res.status(200).json({
      statusCode: 200,
      status: 'OK',
      message: 'IoT Data',
      data: iotData
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      status: 'Internal Server Error',
      message: 'An error occurred while retrieving IoT data',
      error: err.message
    });
  }
  };
// Getting IoT Data which is not assign to any vehicle -- END //

// Getting ECU Data which is not assign to any vehicle -- START//
exports.getECU = async (req, res) => {
  try {
    const { user_id } = req.params;

    const ecuData = await Vehicle.find({
      user_id,
      ecu: { $exists: true }
    });

    res.status(200).json({
      statusCode: 200,
      status: 'OK',
      message: 'ECU Data',
      data: ecuData
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      status: 'Internal Server Error',
      message: 'An error occurred while retrieving ECU data',
      error: err.message
    });
  }
  };
// Getting ECU Data which is not assign to any vehicle -- END//

// Getting DMS Data which is not assign to any vehicle -- START//
exports.getDMS = async (req, res) => {
  try {
    const { user_id } = req.params;

    const dmsData = await Vehicle.find({
      user_id,
      dms: { $exists: true }
    });

    res.status(200).json({
      statusCode: 200,
      status: 'OK',
      message: 'DMS Data',
      data: dmsData
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      status: 'Internal Server Error',
      message: 'An error occurred while retrieving DMS data',
      error: err.message
    });
  }
  };
// Getting DMS Data which is not assign to any vehicle -- END//

// Update Vehicle Info -START (EXP) //
exports.updateVehicle1 = async(req, res) => {
    const { userId } = req.params;
  
    try {
      // const checkQuery = {
      //   vehicle_registration: req.body.vehicle_registration
      // };
  
      const existingVehicle = await Vehicle.findOne({userId}).exec();
  
      if (existingVehicle && existingVehicle._id.toString() !== userId) {
        return res.status(500).send({ Error: "Vehicle Already Exists" });
      }
  
      const updateData = {
        vehicle_name: req.body.vehicle_name,
        vehicle_registration: req.body.vehicle_registration,
        featureset: 1,
        status: req.body.status,
        updated_at: new Date()
      };
  
      if (req.body.dms && req.body.iot == null && req.body.ecu == null) {
        updateData.dms = req.body.dms;
        updateData.$unset = { iot: "", ecu: "" }; // Unset iot and ecu fields if they exist
      } else if (req.body.dms == null && req.body.iot && req.body.ecu) {
        updateData.iot = req.body.iot;
        updateData.ecu = req.body.ecu;
        updateData.$unset = { dms: "" }; // Unset dms field if it exists
      } else {
        updateData.iot = req.body.iot;
        updateData.ecu = req.body.ecu;
        updateData.dms = req.body.dms;
      }
  
      const updatedVehicle = await Vehicle.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      );
  
      if (!updatedVehicle) {
        return res.status(404).send({ Error: "Vehicle not found" });
      }
  
      res.status(200).send({ updatedData: updatedVehicle });
    } catch (err) {
      res.status(500).send({ Error: err.message });
    }
  };
// Update Vehicle Info -END (EXP)//

// Update Vehicle Info -START  Add Device(ECU, IOT, DMS)//
exports.updateVehicle = async (req, res) => {
    const { userId } = req.params;
    const { vehicleId } = req.params;
  
    // const checkQuery = {
    //   userId: userId,
    //   //userId: userId
    // };
  
    try {
      const existingVehicle = await Vehicle.findOne({ userId: userId }).exec();

  // console.log(existingVehicle); return false;
      if (!existingVehicle) {
        res.status(404).send({ Error: "Vehicle not found for the given user" });
      } else {
        const updateData = {};
  
        // if (req.body.dms) {
        //   updateData.dms = req.body.dms;
        // }
        // if (req.body.iot) {
        //   updateData.iot = req.body.iot;
        // }
        // if (req.body.ecu) {
        //   updateData.ecu = req.body.ecu;
        // }
        if (req.body.dms && req.body.iot == null && req.body.ecu == null) {
          updateData.dms = req.body.dms;
        } else if (req.body.dms == null && req.body.iot && req.body.ecu) {
          updateData.ecu = req.body.ecu;
          updateData.iot = req.body.iot;
        } else {
          updateData.ecu = req.body.ecu;
          updateData.iot = req.body.iot;
          updateData.dms = req.body.dms;
        }
  
        const updatedVehicle = await Vehicle.findOneAndUpdate(
          {userId: userId},
          { $set: updateData },
          { new: true }
        ).exec();
  
        res.status(200).send({ updatedVehicle });
      }
    } catch (err) {
      res.status(500).send({ Error: err.message });
    }                        
  };
// Update Vehicle Info -END Add Device(ECU, IOT, DMS)//
// Update Vehicle Info -END //
// exports.updateVehicle = async (req, res) => {
//   const { vehicle_id, user_id } = req.params;
//   let { ...columns } = req.body;

//   try {
//     const vehicle = await Vehicle.findOneAndUpdate(
//       { _id: vehicle_id, user_id: user_id },
//       { $set: columns },
//       { new: true }
//     );

//     if (!vehicle) {
//       return res.status(404).send({ Error: "Vehicle not found" });
//     }

//     res.status(200).send({ editResult: vehicle });
//   } catch (error) {
//     res.status(500).send({ Error: error.message });
//   }
// };

// Delete Vehicle -START //
exports.deleteVehicle = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await Vehicle.findOneAndDelete({ userId });
    return res.status(200).json({
      statusCode: 200,
      status: 'OK',
      message: 'Vehicle Data Succesfully Deleted',
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
// Delete Vehicle -END //1

// Add Device (DMS, ECU, IOT) -- START //
exports.AddDevice = async (req, res) => {
  const { dms, ecu, iot } = req.body;
}
// Add Device (DMS, ECU, IOT) -- END //
