const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    trip_id: {
        type: String,
        unique: true,
        required: true,
    },
    device_id: {
        type: String,
        required: true, 
    },
    lat: {
        type: String,
        required: true,
    },
    lng: {
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