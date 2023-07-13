const mongoose = require('mongoose');


const LeadershipBoardSchema = new mongoose.Schema({

total_distance:   {type: Number,  required: true},
    
})
    
const LeadershipBoardAnalytics = mongoose.model('LB_Analytics_Admin', LeadershipBoardSchema);
    
module.exports = LeadershipBoardAnalytics;