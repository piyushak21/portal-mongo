const Contacts = require("../../models/Customers/contacts.model");
const express = require("express");
const app = express();

const bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//================{Email- Validation}========================//
function isValidateEmail(Vemail) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(Vemail).toLowerCase());
  }
//========================{Add Contacts }=========================//
exports.AddContacts = async (req,res) => {
    try{ 

        const {Name,Email,Contact_Number,Gender} = req.body;

        if  (!Name) { 
            return res.status(400).json({ message: 'Name is required' });
          } else if  (!Email) { 
            return res.status(400).json({ message: 'Email is required' });
          } else if  (!Contact_Number) { 
            return res.status(400).json({ message: 'Contact_Number is required' });
          } else if  (!Gender) {
            return res.status(400).json({ message: 'Gender is required' });
          }  

          if (!isValidateEmail(Email)) {
            return res.status(401).send({
              statuscode: 401,
              status: "Failed",
              message: "Email Is Invalid",
              data: {},
            });
          }

          const newContacts = new Contacts({ 
            Name,
            Email,
            Contact_Number,
            Gender,

          });
          const savedContacts = await newContacts.save();
          console.log('Contacts saved successfully:', savedContacts);
          res.status(200).json({ code: 200, message: 'Contacts Added Successfully', addContacts: savedContacts });
        } catch (error) {
          console.log(error);
          res.status(500).json({ code: 500, message: 'Failed to add Contacts' });
        }
};

//========================{Get Contacts By Email}=================//
exports.getContactsByEmail = async (req, res) => {
    try {
      const { Email } = req.params;
      const contacts = await Contacts.findOne({Email : Email});
  
      if (!contacts) {
        return res.status(404).json({
          statuscode: 404,
          status: "Failed",
          message: "Contacts Not Found",
          data: {},
        });
      }
  
      return res.status(200).json({
        statuscode: 200,
        status: "OK",
        message: "Contacts Get Successful",
        data: {
          contacts,
        },
      });
    } catch (error) {
      console.error("Failed to get Contacts", error);
      return res.status(500).json({
        statuscode: 500,
        status: "Error",
        message: "Failed to get Contacts",
        data: {},
      });
    }
};

//=========================={Update Contacts}=====================//
exports.UpdateContacts = async (req, res) => {
    const { field, value } = req.body;
    const { Email } = req.params;

    if (!field || !value) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      let updateField;
      switch (field) {
        case 'Name':
          updateField = 'Name';
          break;
        case 'Email':
          updateField = 'Email';
          break;
        case 'Contact_Number':
          updateField = 'Contact_Number';
          break;
        case 'Gender':
          updateField = 'Gender';
          break;
        default:
          return res.status(400).json({ error: 'Invalid field' });
      }

      try {
        const UpdateContacts = await Contacts.findOneAndUpdate(

            {Email : Email},
            { $set: { [updateField]: value } },
      
            { new: true },
        );

        if (!UpdateContacts) {
      return res.status(404).json({ error: 'Conatcts not found' });
    }

    res.status(200).json({ message: 'Contacts updated successfully', UpdateContacts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update Contacts' });
  }
};

//=========================={Delete Contacts}======================//
exports.DeleteContacts = async (req, res) => {
    try {
        const { Email } = req.params;
        const contacts = await Contacts.findOneAndDelete({ Email: Email});

        if(!contacts) {
            return res.status(404).json({ error: "Contacts Not Found"});
        }
    res.status(200).json({ message: 'Contacts Deleted Successfully', contacts });
  } catch (error) { 
    console.log(error); 
    res.status(500).json({ error: 'Failed to delete Contacts' });
  }
};