const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    //name: String,

    type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
    
  });

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        min: 4,
        max: 255,
    },
    phoneNumber: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    relationship : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email : {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    location: locationSchema,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});


module.exports = mongoose.model('Contact', contactSchema);