const {Admin} = require('../db')

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    const username = req.headers.username
    const password = req.headers.password

    Admin.findOne({
        username: username,
        password: password
    })
    .then(val => {
        if(val) next()
        else res.status(403).json({
            msg: "User dosen't exist"
        })
    })
}

module.exports = adminMiddleware;