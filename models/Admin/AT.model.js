const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({

brake:        {type: Number,  required: true},
tailgating:   {type: Number,  required: true},
rash_driving: {type: Number,  required: true},
sleep_alert:  {type: Number,  required: true},
over_speed:   {type: Number,  required: true},
green_zone:   {type: Number,  required: true},
minimum_distance:        {type: Number,  required: true},
minimum_driver_rating:   {type: Number,  required: true},
ttc_difference_percentage:   {type: Number,  required: true},
total_distance:   {type: Number,  required: true},
duration:   {type: Number,  required: true},



})

const ScoreAnalytics = mongoose.model('Score_Analytics_Admin', ScoreSchema);

module.exports = ScoreAnalytics;

