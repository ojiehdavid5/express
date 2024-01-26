const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:false
    },

    firstname:{
        type:String,
        required:false
    },
    lastname:{
        type:String,
        required:false
    },


    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },

    confirmpassword: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);