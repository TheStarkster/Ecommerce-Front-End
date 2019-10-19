const Products = require('../../models/products/product')
module.exports = {
    RenderAllProducts: (req, res) => {
        Products.find()
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
        Products.createIndexes([{ name: 1 }])
            .then(
                Products.find()
                    .then(u => {
                        if (u) {
                            res.json({
                                u
                            })
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            )

    }
}