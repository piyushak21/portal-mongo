const mongoose = require('mongoose');


const AccidentSchema = new mongoose.Schema({

ttc_difference_percentage:   {type: Number,  required: true},
    
})
    
const AccidentAnalytics = mongoose.model('Accident_Analytics_Admin', AccidentSchema);
    
module.exports = AccidentAnalytics;