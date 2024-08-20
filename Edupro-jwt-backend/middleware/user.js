const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")

function userMiddleware(req, res, next) {
    const token = req.headers.authorization
    const words = token.split(" ")
    const jsonToken = words[1]

    const decoded = jwt.verify(jsonToken, JWT_SECRET)

    if(decoded.username){
        req.username = decoded.username
        next()
    } else{
        res.status(403).json({
            msg: "You are not authenticated"
        })
    }
}

module.exports = userMiddleware;