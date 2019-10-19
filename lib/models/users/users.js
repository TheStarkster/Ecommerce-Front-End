const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    registerDate:{
        type:String,
        required:false
    },
    region:{
        type:String,
        require:false
    },
    cart:{
        type:Object,
        require:false
    },
    cartTotal:{
        type:String,
        require:false
    }
});

const User = mongoose.model('users',user);
module.exports = User
