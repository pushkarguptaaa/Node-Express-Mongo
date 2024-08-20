const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    const token = req.headers.authorization
    const words = token.split(" ")
    const jsonToken = words[1]

    try{
        const decoded = jwt.verify(jsonToken, JWT_SECRET)

        if(decoded.username){
            next()
        } else{
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    }
    catch(e){
        res.json({
            msg: "Incorrect inputs"
        })
    }
}

module.exports = adminMiddleware;