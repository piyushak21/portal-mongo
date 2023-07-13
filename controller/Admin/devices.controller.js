const Devices = require("../../models/Admin/device.model");
const express = require('express');
app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//========================{Add Device}================================//
exports.AddDevice = async (req,res) => {
    try{ 

        const {device_id,device_type,customer_id,sim_number,status} = req.body;

        if  (!device_id) { 
            return res.status(400).json({ message: 'device_id is required' });
          } else if  (!device_type) { 
            return res.status(400).json({ message: 'device_type is required' });
          } else if  (!customer_id) { 
            return res.status(400).json({ message: 'customer_id is required' });
          } else if  (!sim_number) {
            return res.status(400).json({ message: 'sim_number is required' });
          }  else if  (!status) {
            return res.status(400).json({ message: 'status is required' });
          } 

          const newDevice = new Devices({ 
            device_id,
            device_type,
            customer_id,
            sim_number,
            status

          });
          const savedDevice = await newDevice.save();
          console.log('User saved successfully:', savedDevice);
          res.status(200).json({ code: 200, message: 'Devices Added Successfully', addDevices: savedDevice });
        } catch (error) {
          console.log(error);
          res.status(500).json({ code: 500, message: 'Failed to add Devices' });
        }
};

//========================{Get Device By ID}===========================//
exports.getDeviceById = async (req, res) => {
    try {
      const { id } = req.params;
      const device = await Devices.findById({_id : id});
  
      if (!device) {
        return res.status(404).json({
          statuscode: 404,
          status: "Failed",
          message: "Device Not Found",
          data: {},
        });
      }
  
      return res.status(200).json({
        statuscode: 200,
        status: "OK",
        message: "Device Get Successful",
        data: {
          device,
        },
      });
    } catch (error) {
      console.error("Failed to get device", error);
      return res.status(500).json({
        statuscode: 500,
        status: "Error",
        message: "Failed to get device",
        data: {},
      });
    }
};

//========================{Get All Devices (totalCount)}===============//
exports.GetAllDevices = async (req, res) => {
    try {
        let device = await Devices.find()
        totalCount = device.length;
        if(!device){
            return res.status(400).json({
                statuscode: 400,
                status: "Failed",
                message: "Devices data Not Found",
                data: {},
            });
        }
        if (totalCount > 0) {

        
        return res.status(200).json({
            statuscode: 200,
            status: "OK",
            TotalCount: totalCount,
            message: "All Devices Data Get Successfull",
            data: {
             
             device
               
            },
        });
      }
        
        } catch (error) {
        console.error("Failed to Get Devices", error);
        return res.status(500).json({
            statuscode: 500,
            status: "Error",
            message: error.message,
            data: {},
        });
        }
};

//========================={Update Devices}============================//
exports.UpdateDevice = async (req, res) => {
  try {
    const { device_id } = req.params;
    const {
      device_type,
      customer_id,
      sim_number,
      status,
    } = req.body;

    const updatedDevice = await Devices.findOneAndUpdate(
      { device_id },
      {
        device_type,
        customer_id,
        sim_number,
        status,
      },
      { new: true }
    );

    if (!updatedDevice) {
      return res.status(404).json({ error: 'Device not found' });
    }

    res.status(200).json({ message: 'Device updated successfully', updatedDevice });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update Device' });
  }
};


//========================={Delete Devices}============================//
exports.DeleteDevice = async (req, res) => {
    try {
        const { id } = req.params;
        const device = await Devices.findOneAndDelete({ _id: id});

        if(!device) {
            return res.status(404).json({ error: "Device Not Found"});
        }
    res.status(200).json({ message: 'Device Deleted Successfully', device });
  } catch (error) { 
    console.log(error); 
    res.status(500).json({ error: 'Failed to delete Device' });
  }
};

//=========================={Get IOT Devices}========(Not USE)==================//
// exports.getIOTDevice = async (req, res) => {
//   try {
//     const { device_type } = req.params;

//     const iotData = await Devices.find({
     

//       device_type,
//       iot: { $exists: true }
//     });
//     totalCount = iotData.length;
// if (totalCount > 0) {
//     res.status(200).json({
//       statusCode: 200,
//       status: 'OK',
//       TotalCount: totalCount,
//       message: 'IoT Data',
//       data: iotData
//     });
//   }
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       status: 'Internal Server Error',
//       message: 'An error occurred while retrieving IoT data',
//       error: err.message
//     });
//   }
//   };

  //======================={GET devices by device type}=================//
exports.getDevicesByType = async (req, res) => {
  const { deviceType } = req.params;

  try {
    // let device = await Devices.find()
    const devices = await Devices.find({ device_type: deviceType });
    totalCount = devices.length;
    if (devices.length > 0) {
      res.status(200).json({
        code: 200,
        status: "OK",
        TotalCount: totalCount,
        message: 'Devices Data Get successfully',
        devices,
      });
      
    } else {
      res.status(404).json({
        code: 404,
        message: 'No devices found for the specified device type',
      });
      
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: 'Failed to get devices data by device type',
    });
  }
};


// exports.globalSearch = async (req, res) => {
//   const { query } = req.body;

//   try {
//     const searchResults = await performGlobalSearch(query);
//     res.status(200).json({ results: searchResults });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Failed to perform search' });
//   }
// };

// const performGlobalSearch = async (query) => {
//   const { device_id, device_type, customer_id, sim_number, status } = query;

//   try {
//     // Build the search query based on the provided parameters
//     const searchQuery = {};
//     if (device_id) {
//       searchQuery.device_id = { $regex: device_id, $options: 'i' };
//     }
//     if (device_type) {
//       searchQuery.device_type = { $regex: device_type, $options: 'i' };
//     }
//     if (customer_id) {
//       searchQuery.customer_id = { $regex: customer_id, $options: 'i' };
//     }
//     if (sim_number) {
//       searchQuery.sim_number = { $regex: sim_number, $options: 'i' };
//     }
//     if (status) {
//       searchQuery.status = { $regex: status, $options: 'i' };
//     }

//     // Perform the search using a MongoDB model (e.g., Devices model)
//     const searchResults = await Devices.find(searchQuery);

//     return searchResults;
//   } catch (error) {
//     console.log(error);
//     throw new Error('Failed to perform search');
//   }
// };

// exports.GetAllDevices = async (req, res) => {
//   try {
//     const searchQuery = req.query.q; // Get the search query from request query parameters
//     let devices;
//     let totalCount;

//     if (searchQuery) {
//       // If search query is provided, perform the search operation
//       devices = await Devices.find({
//         $or: [
//           { $text: { $search: searchQuery } }, // Perform text search on all fields
//         ],
//       });

//       totalCount = devices.length;
//     } else {
//       // If no search query is provided, fetch all devices
//       devices = await Devices.find();
//       totalCount = devices.length;
//     }

//     if (totalCount > 0) {
//       return res.status(200).json({
//         statuscode: 200,
//         status: "OK",
//         TotalCount: totalCount,
//         message: "All Devices Data Get Successful",
//         data: {
//           devices,
//         },
//       });
//     } else {
//       return res.status(404).json({
//         statuscode: 404,
//         status: "Not Found",
//         message: "Devices data Not Found",
//         data: {},
//       });
//     }
//   } catch (error) {
//     console.error("Failed to Get Devices", error);
//     return res.status(500).json({
//       statuscode: 500,
//       status: "Error",
//       message: error.message,
//       data: {},
//     });
//   }
// };
