const mongoose = require('mongoose');

const reportsSchema = new mongoose.Schema({
  
   
    id: {
        type: String,
        required: true, 
    },
    trip_id: {
        type: String,
        required: true,
    },
    device_id: {
        type: String,
       // required: true,
    },
    event: {
        type: String,
       // required: true,
    },
    message: {
        type: String,
       // required: true,
    },
    timestamp: {
        type: String,
       // default: 1,
    },
    ignition: {
        type: String,
        required: true,
    },
    lat: {
        type: String,
       // default: Date.now,
    },
    lng: {
        type: String,
        required: true,
    },
    spd: {
        type: String,
       // default: Date.now,
    },
      cpu_lods: {
        type: String,
       // default: Date.now,
    },
    cpu_temp: {
        type: String,
        required: true,
    }, 
    memory: {
        type: String,
        required: true,
    },
    jsondata: {
        type: String,
        required: true,
    },
  
}); 

reportsSchema.pre('save', function(done) {
    this.updated_at = Date.now();
    done();
});

// Create the VehicleModel model
const ReportsModel = mongoose.model('report', reportsSchema);

// Export the VehicleModel model
module.exports = ReportsModel;
