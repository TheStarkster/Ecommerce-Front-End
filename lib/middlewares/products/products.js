const Products = require('../../models/products/product')
module.exports = {
    RenderAllProducts: (req, res) => {
        Products.find()
            .limit(24)
            .then(products => {
                res.json({
                    products
                })
            })
            .catch(e => {
                console.log(e)
            })
    },
    SearchProducts: (req, res) => {
        Products.find({ $text: { $search: req.params.query } })
        .then(u => {
            res.send(u)
        })

    },
    SimilarProduct: (req, res) => {
        Products.find({ tags: req.body.tags })
            .then(u => {
                if (u) {
                    res.send(u)
                } else {
                    res.send({
                        message: "No Products Matched"
                    })
                }
            })
    },
    GetProduct: (req, res) => {
        Products.find({ _id: req.body.id })
            .then(u => {
                res.send(u)
            })
    }
}