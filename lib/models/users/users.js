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
    address:{
        type:Array,
        require:false
    },
    region:{
        type:String,
        require:false
    },
    cart:{
        type:Object,
        require:false
    },
    orders:{
        type:Object,
        require:false
    }
});

const User = mongoose.model('users',user);
module.exports = User
