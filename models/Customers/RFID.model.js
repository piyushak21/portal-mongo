const mongoose = require('mongoose');


const RFIDSchema = new mongoose.Schema({
   
    RFID:{type: String,  required: true },
    Driver_Name:{type: String,  required: true },
    Age:{type: String,  required: true },
    Contact_Number:{type: String,  required: true },
    Gender:{type: String,  required: true },
    //status:{type: String, required: true },
});


// Create the User model
const RFID = mongoose.model('RFID', RFIDSchema);

// Export the User model
module.exports = RFID;