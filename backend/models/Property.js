const mongoose = require('mongoose')

const PropertySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 8,
    },
    type: {
        type: String,
        enum: ["Rent", "Sale"],
        required: true,
    },
    desc: {
        type: String,
        required: true,
        min: 20,
    },
    img: {
        type: [String],
        required: true,
    },
    sqmeters: {
        type: Number,
        required: true,
    },
    bed:{
        type: Number,
        required: true,
        min: 1
    },
    bathroom:{
        type: Number,
        required: true,
        min: 1
    },
    parking:{
        type: Boolean,
        default: false,
    },
    furnished:{
        type: Boolean,
        default: false,
    },
    offer:{
        type: Boolean,
        default: false,
    },
    price:{
        type: Number,
        required: true,
    },
    discprice: {
        type: Number,
        required: function() {
            return this.offer === true;
        },
    },
    location: {
        type: String,
        required: true,
    },
    geolocation: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    }
}, {timestamps:true})

// Index the geolocation field for efficient querying
PropertySchema.index({ geolocation: '2dsphere' });

module.exports = mongoose.model("Property", PropertySchema)