const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course, User } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    await User.create({
        username,
        password
    })

    res.json({
        msg: "User Created Successfully"
    })
});

router.post('/signin', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = User.find({
        username,
        password
    })

    if(user){
        const token = jwt.sign({
            username
        },JWT_SECRET)

        res.json({
            token: token
        })
    }
    else{
        res.status(411).json({
            msg: "Incorrect email and password"
        })
    }
});

router.get('/courses', async (req, res) => {
    const response = await Course.find({})

    res.json({
        message: response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId
    const username = req.username

    await User.updateOne({
        username
    },{
        "$push": {
            purchasedCourses: courseId
        }
    })

    res.json({
        msg: "Purchase complete"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const username = req.username
    const user = await User.findOne({
        username
    })

    const courses = await Course.find({
        _id:{
            "$in": user.purchasedCourses
        }
    })

    res.json({
        msg: courses
    })
});

module.exports = router