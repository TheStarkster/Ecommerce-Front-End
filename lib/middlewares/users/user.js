const User = require('../../models/users/users')
module.exports = {
    addToCart: (req, res) => {
        User.updateOne({ _id: req.body.id }, {
            cart: req.body.cart,
        })
            .then(u => {
                if (u) {
                    res.send({
                        message: "Cart-Updated"
                    })
                }
            })
    },
    fetchCart: (req, res) => {
        User.findOne({ _id: req.body.id })
            .then(u => {
                if (u) {
                    res.send({
                        cart: u.cart
                    })
                }
            })
    },
    removeItem: (req, res) => {
        User.updateOne({ _id: req.body.id }, {
            cart: req.body.cart,
        })
            .then(u => {
                console.log(u)
                res.send("Item Removed")
            })
    },
    UpdateAddress:(req,res) => {
        User.updateOne({_id:req.body.id},{
            address: req.body.address
        })
        .then(u=>{
            res.send({
                message:"Updated"
            })
        })
    },
    SaveAddress: (req, res) => {
        User.findOne({ _id: req.body.id })
            .then(u => {
                if (u) {
                    console.log(req.body)
                    if (u.address === undefined || u.address.length === 0) {
                        var DefaultAddress = [
                            { default: req.body.address }
                        ]
                        User.updateOne({ _id: req.body.id }, {
                            address: DefaultAddress
                        })
                            .then(u => {
                                res.send(u)
                            })
                    }else{
                        u.address.push({"other":req.body.address})
                        User.updateOne({ _id: req.body.id }, {
                            address: u.address
                        })
                            .then(u => {
                                res.send(u)
                            })
                    }
                }
            })
    },
    UpdateWishlist:(req,res) => {
        User.updateOne({_id:req.body.id},{
            wishlist:req.body.wishlist
        })
        .then(u=>{
            res.send('Done')
        })
    },
    UpdateUser:(req,res) => {
        User.updateOne({_id:req.body.id},{
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact
        })
        .then(u=>{
            res.send({
                message:"Updated"
            })
        })
    },
    UpdatePassword:(req,res) => {
        User.findById({_id:req.body.id})
        .then(u=>{
            if(u.password === req.body.oldpass){
                User.updateOne({_id:req.body.id},{
                    password:req.body.newpass
                })
                .then(x=>{
                    res.send({
                        message:"Updated"
                    })
                })
            }else{
                res.send({
                    message:"Wrong Old Password"
                })
            }
        })
    }
}