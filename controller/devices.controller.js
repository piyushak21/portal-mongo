const Devices = require("../models/device.model");
const express = require('express');
app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


exports.Device = async (req,res) => {
    try{ 

        const {device_id,device_type,user_id,sim_number,status} = req.body;

        if  (!device_id) { 
            return res.status(400).json({ message: 'device_id is required' });
          } else if  (!device_type) { 
            return res.status(400).json({ message: 'device_type is required' });
          } else if  (!user_id) { 
            return res.status(400).json({ message: 'user_id is required' });
          } else if  (!sim_number) {
            return res.status(400).json({ message: 'sim_number is required' });
          }  else if  (!status) {
            return res.status(400).json({ message: 'status is required' });
          } 

          const newDevice = new Devices({
            device_id,
            device_type,
            user_id,
            sim_number
          });
          const savedDevice = await newDevice.save();
          console.log('User saved successfully:', savedDevice);
          res.status(200).json({ code: 200, message: 'Devices Added Successfully', addDevices: savedDevice });
        } catch (error) {
          console.log(error);
          res.status(500).json({ code: 500, message: 'Failed to add Devices' });
        }
};

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

exports.GetAllDevices = async (req, res) => {
    try {
        let device = await Devices.find()
        if(!device){
            return res.status(400).json({
                statuscode: 400,
                status: "Failed",
                message: "Devices data Not Found",
                data: {},
            });
        }
        return res.status(200).json({
            statuscode: 200,
            status: "OK",
            message: "All Devices Data Get Successfull",
            data: {
             
             device
               
            },
        });
        
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

exports.UpdateDevice = async (req, res) => {
    const { field, value } = req.body;
    const { id } = req.params;

    if (!field || !value) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      let updateField;
      switch (field) {
        case 'device_id':
          updateField = 'device_id';
          break;
        case 'device_type':
          updateField = 'device_type';
          break;
        case 'user_id':
          updateField = 'user_id';
          break;
        case 'sim_number':
          updateField = 'sim_number';
          break;
        case 'status':
          updateField = 'status';
          break;
        default:
          return res.status(400).json({ error: 'Invalid field' });
      }

      try {
        const UpdateDevice = await Devices.findByIdAndUpdate(

            {_id : id},
            { $set: { [updateField]: value } },
      
            { new: true },
        );

        if (!UpdateDevice) {
      return res.status(404).json({ error: 'Device not found' });
    }

    res.status(200).json({ message: 'Device updated successfully', UpdateDevice });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update Device' });
  }
};

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
