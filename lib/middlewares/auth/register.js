const Users = require('../../models/users/users');
module.exports = {
    RegistrationHandler : (req,res) => {
        console.log(req.body.email);
        Users.findOne({email:req.body.email})
            .then(u=>{
                if(u){
                    res.send({
                        message:"409: Already Exists"
                    })
                }else{
                    console.log(req.body)
                    const NewUser = new Users({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.pass,
                        region:req.body.region,
                        registerDate: Date.now()
                    })
                    NewUser.save()
                    .then(u=>{
                        if(u){
                            res.send({
                                message:"200: Registered"
                            })
                        }

                    })
                    .catch(e=>{
                        console.log(e);
                    });
                }
            })
            .catch(e=>{
                console.log(e);
            })
            console.log("out OFF");
    }
}