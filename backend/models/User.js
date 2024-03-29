const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    isGoogleSignedIn: { 
        type: Boolean, 
        default: false 
    },
    password:{
        type: String,
        required: function() {
            return !this.isGoogleSignedIn;
        },
        min: 6
    },
    profileImg:{
        type: String,
        default: ""
    }
},{timestamps:true})

module.exports = mongoose.model("User", UserSchema)