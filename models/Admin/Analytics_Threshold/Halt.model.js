const mongoose = require('mongoose');


const HaltSchema = new mongoose.Schema({

duration:   {type: Number,  required: true},
    
})
    
const HaltAnalytics = mongoose.model('Halt_Analytics_Admin', HaltSchema);
    
module.exports = HaltAnalytics;