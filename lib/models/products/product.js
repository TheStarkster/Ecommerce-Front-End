const mongoose = require('mongoose')

const product = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    disc:{
        type:String,
        required:false
    },
    price:{
        type:String,
        require:true
    },
    rating:{
        type:String,
        require:false
    },
    stock:{
        type:String,
        required:false
    }
})

const Products = mongoose.model('products',product);
module.exports = Products