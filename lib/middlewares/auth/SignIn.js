const Users = require('../../models/users/users');
module.exports = {
    SignInHandler: (req, res) => {
        Users.findOne({ email: req.body.email })
            .then(u => {
                if (u) {
                    if (u.password == req.body.pass) {
                        res.send({
                            message: "200: User Authenticated",
                            data: u
                        })
                    } else {
                        res.send({
                            message: "Incorrect Password!",
                        })
                    }
                } else {
                    res.send({
                        message: "User Not Registered"
                    })
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
}