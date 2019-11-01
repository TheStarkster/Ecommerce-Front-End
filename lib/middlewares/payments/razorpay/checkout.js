const Razorpay = require('razorpay')
const nodemailer = require('nodemailer');
const User = require('../../../models/users/users')

var instance = new Razorpay({
    key_id: 'rzp_test_hcBEyLK2rKpWkS',
    key_secret: 'AilD2hmREnc2HEDIuIBYzu6O'
})
module.exports = {
    CreateOrder: (req, res) => {
        var options = {
            amount: req.body.amount,
            receipt: req.body.receipt,
            currency: "INR",
            payment_capture: '0'
        }
        instance.orders.create(options, function (err, order) {
            res.send(order)
        })
    },
    CheckPayment: (req, res) => {
        instance.payments.fetch(req.body.paymentId)
            .then(u => {
                if (u.status === "captured") {
                    let trasnporter = nodemailer.createTransport({
                        service: 'gmail',
                        secure: 'false',
                        port: 25,
                        auth: {
                            user: 'sgurkaran2000@gmail.com',
                            pass: '7Namwaheguru'
                            //IMPORTANT NOTE: Please Goto your Gmail-Account> Settings > Forwarding and POP/IMAP > Enable ---> [IMAP]
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });
                    let HelperOption = {
                        from: '"Gurkaran Singh"' + '<sgurkaran2000@gmail.com>',
                        to: 'sgurkaran1999@gmail.com',
                        subject: "ORDER(S)",
                        text: JSON.stringify({
                            Detail: req.body.text,
                        })
                    }
                    trasnporter.sendMail(HelperOption, (err, info) => {
                        if (err) {
                            console.log(err);
                        } else {
                            User.updateOne({ _id: req.body.userID }, {
                                orders: req.body.orders,
                                cart:[]
                            })
                                .then(u => {
                                    if (u) {
                                        res.send("Success");
                                    }
                                })
                        }
                    })
                }
            })
    }
}