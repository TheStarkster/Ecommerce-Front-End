const checksum = require('../handlers/checksum')
module.exports = {
    RequestHandler: (req, res) => {
        var paramlist = req.body
        var paramArray = new Array()

        for(name in paramlist){
            if(name === "PAYTM_MERCHANT_KEY"){
                var PAYTM_MERCHANT_KEY = paramlist[name]
            }else{
                paramArray[name] = paramlist[name]
            }
        }
        paramArray["CALLBACK_URL"] = "http://localhost:2024/api/paytm/response"
        checksum.genchecksum(paramArray,PAYTM_MERCHANT_KEY,(err, result) => {
            if(err) throw err
            res.render("paytm/request", {result})
        })
    }
}