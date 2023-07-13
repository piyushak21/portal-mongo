const mongoose = require('mongoose');


const IncentiveSchema = new mongoose.Schema({

minimum_distance:        {type: Number,  required: true},
minimum_driver_rating:   {type: Number,  required: true},
    
})

const IncentiveAnalytics = mongoose.model('Incentive_Analytics_Admin', IncentiveSchema);
    
module.exports = IncentiveAnalytics;