const Users  = require("../../models/Customers/user.model");
const express = require('express');
app = express();
//const jwt = require('jsonwebtoken');
const { generateJwt } = require("../../auth/JWT");
const storage = require("node-sessionstorage");
const bodyPar = require("body-parser");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
//const { sendEmail } = require("../auth/EMAIL");

app.use(bodyPar.urlencoded({ extended: true }));
app.use(bodyPar.json());


//==================={Add/Create  RFID [START]}================//
exports.AddRFID = async (req, res) => {
  try{ 

    const {RFID, Driver_Name, Gender, Age, Contact_Number,} = req.body;

    if  (!RFID) { 
      return res.status(400).json({ message: 'RFID is required' });
    } else if  (!Driver_Name) { 
        return res.status(400).json({ message: 'Driver_Name is required' });
      } else if  (!Age) { 
        return res.status(400).json({ message: 'Age is required' });
      } else if  (!Contact_Number) { 
        return res.status(400).json({ message: 'Contact_Number is required' });
      } else if  (!Gender) {
        return res.status(400).json({ message: 'Gender is required' });
      }  



      const newRFID = new Contacts({ 
        RFID,
        Driver_Name,
        Age,
        Contact_Number,
        Gender,

      });
      const savedRFID = await newRFID.save();
      console.log('RFID saved successfully:', savedRFID);
      res.status(200).json({ code: 200, message: 'RFID Added Successfully', addRFID: savedRFID });
    } catch (error) {
      console.log(error);
      res.status(500).json({ code: 500, message: 'Failed to add RFID' });
    }


};
//==================={Add/Create  RFID [END]}================//

//======================={Delete  RFID [START]}=====================//
exports.DeleteRFID = async (req, res) => {

};




function generateRFIDCode() {
  const timestamp = Date.now().toString();
  const randomBytes = crypto.randomBytes(4).toString('hex').toUpperCase();

  return `${timestamp}-${randomBytes}`;
}

const rfidCode = generateRFIDCode();
console.log(rfidCode);

//======================={Delete  RFID [END]}======================//

//==================={Add/Create  RFID [START]}================//

//==================={Add/Create  RFID [START]}================//