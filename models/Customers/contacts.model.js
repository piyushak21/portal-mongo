const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
   
    Name:{type: String,  required: true },
    Email:{type: String,  required: true },
    Contact_Number:{type: String,  required: true },
    Gender:{type: String,  required: true },
    //status:{type: String, required: true },
});


// Create the User model
const Contacts = mongoose.model('Contacts', contactSchema);

// Export the User model
module.exports = Contacts;