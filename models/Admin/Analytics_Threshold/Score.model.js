const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({

brake:        {type: Number,  required: true},
tailgating:   {type: Number,  required: true},
rash_driving: {type: Number,  required: true},
sleep_alert:  {type: Number,  required: true},
over_speed:   {type: Number,  required: true},
green_zone:   {type: Number,  required: true},

})

const ScoreAnalytics = mongoose.model('Score_Analytics_Admin', ScoreSchema);

module.exports = ScoreAnalytics;

