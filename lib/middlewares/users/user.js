const User = require('../../models/users/users')
module.exports = {
    addToCart: (req, res) => {
        User.updateOne({ _id: req.body.id }, {
            cart: req.body.cart,
            cartTotal: req.body.cartTotal
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
            cartTotal: req.body.cartTotal
        })
            .then(u => {
                res.send("Item Removed")
            })
    },
    SaveAddress: (req, res) => {
        User.findOne({ _id: req.body.id })
            .then(u => {
                if (u) {
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
    }
}