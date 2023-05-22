const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
    },
    vehicle_name: {
        type: String,
        required: true, 
    },
    vehicle_registration: {
        type: String,
        required: true,
    },
    dms: {
        type: String,
       // required: true,
    },
    ecu: {
        type: String,
       // required: true,
    },
    iot: {
        type: String,
       // required: true,
    },
    featureset: {
        type: Number,
        default: 1 ,
    },
    status: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// Create the Admin model
const VehicleModel = mongoose.model('Vehicle_master', vehicleSchema);
//const VehicleModel = getDb().model('vehicle_master', VehicleSchema);


// Export the Admin model
module.exports = VehicleModel;