const mongoose = require('mongoose');



const deviceSchema = new mongoose.Schema({
   
    device_id:{type: String,  required: true },
    device_type:{type: String,  required: true },
    user_id:{type: String,  required: true },
    sim_number:{type: String,  required: true },
    status:{type: String },
});


// Create the User model
const Devices = mongoose.model('Devices', deviceSchema);

// Export the User model
module.exports = Devices;