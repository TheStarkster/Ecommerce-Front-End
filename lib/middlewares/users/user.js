const User = require('../../models/users/users')
module.exports = {
    addToCart: (req,res) => {
        User.updateOne({_id:req.body.id},{
            cart:req.body.cart,
            cartTotal:req.body.cartTotal
        })
        .then(u=>{
            if(u){
                res.send({
                    message:"Cart-Updated"
                })
            }
        })
    },
    fetchCart:(req,res) => {
        User.findOne({_id:req.body.id})
        .then(u=>{
            if(u){
                res.send({
                    cart:u.cart
                })
                console.log(u.cart)
            }
        })
    },
    removeItem: (req,res) => {
        console.log(req.body.cart)
        User.updateOne({_id:req.body.id},{
            cart:req.body.cart,
            cartTotal:req.body.cartTotal
        })
        .then(u=>{
            res.send("Item Removed")
        })
    }
}