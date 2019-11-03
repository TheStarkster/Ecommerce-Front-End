const Promocode = require('../models/promocodes')
const User = require('../models/users/users')
var FoundUser = []
const isUsed = (id, code) => {

}
module.exports = {
    ApplyPromo: (req, res) => {
        User.findById({ _id: req.body.id })
            .then(u => {
                FoundUser = u
                if (u.usedCodes === undefined) {
                    Promocode.findOne({ code: req.body.code })
                        .then(u => {
                            this.tempUsedCodes = []
                            if (FoundUser.usedCodes !== undefined) {
                                this.tempUsedCodes = FoundUser.usedCodes
                            }
                            this.tempUsedCodes.push(req.body.code)
                            User.updateOne({ _id: req.body.id }, {
                                usedCodes: this.tempUsedCodes
                            })
                                .then(z => {
                                    if (u.createdfor !== "public" || "Public" || "PUBLIC") {
                                        Promocode.updateOne({ code: req.body.code }, {
                                            status: "inactive"
                                        })
                                            .then(x => {
                                                console.log("fires")
                                                res.send({
                                                    discount: u.discount
                                                })
                                            })
                                    } else {
                                        res.send({
                                            discount: u.discount
                                        })
                                    }
                                })
                        })
                } else {
                    if (u.usedCodes.some(x => x === req.body.code)) {
                        res.send({
                            message: "Expired"
                        })
                    } else {
                        Promocode.findOne({ code: req.body.code })
                            .then(u => {
                                this.tempUsedCodes = []
                                if (FoundUser.usedCodes !== undefined) {
                                    this.tempUsedCodes = FoundUser.usedCodes
                                }
                                this.tempUsedCodes.push(req.body.code)
                                User.updateOne({ _id: req.body.id }, {
                                    usedCodes: this.tempUsedCodes
                                })
                                    .then(z => {
                                        if (u.createdfor !== "public" || "Public" || "PUBLIC") {
                                            Promocode.updateOne({ _id: req.body.CodeID }, {
                                                status: "inactive"
                                            })
                                                .then(x => {
                                                    res.send({
                                                        discount: u.discount
                                                    })
                                                })
                                        } else {
                                            res.send({
                                                discount: u.discount
                                            })
                                        }
                                    })
                            })
                    }
                }
            })
    },
    CheckPromo:(req,res) => {
        Promocode.findOne({code:req.body.code})
        .then(res_code=>{
            if(res_code){
                if(res_code.status === "active"){
                    User.findById({_id:req.body.id})
                    .then(res_user=>{
                        if(res_user.usedCodes === undefined){
                            res.send({
                                discount:res_code.discount
                            })
                        }else{
                            if(res_user.usedCodes.some(x => x === req.body.code)){
                                res.send({
                                    message:"This Promocode can be Used Once!"
                                })
                            }else{
                                res.send({
                                    discount:res_code.discount
                                })
                            }
                        }
                    })
                }else{
                    res.send({
                        message:"This Promocode is Expired!"
                    })
                }
            }else{
                res.send({
                    message:"This Promocode is Invalid!"
                })
            }
        })
    }
}