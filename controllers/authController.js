const userModel = require('../models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { generateToken } = require('../utils/generateToken')

module.exports.registerUser = async function (req, res) {
    try {
        let { email, fullname, password } = req.body;

        let user = await userModel.findOne({ email: email })
        if (user) { 
            req.flash("error","You already have an account, please login")
            return res.redirect('/') 
        }

        bcrypt.genSalt(12, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message)
                let user = await userModel.create({
                    fullname,
                    email,
                    password: hash
                })
                let token = generateToken(user)
                res.cookie("token", token)
                req.flash("success","User created sucessfully")
                res.redirect('/shop')
            })
        })
    }
    catch (err) {
        req.flash("error",err.message)
        res.redirect("/")
    }
}

module.exports.loginUser = async function (req, res) {

    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email })
    if (!user) return res.send("Email or password incorrect")

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user)
            res.cookie("token", token)
            res.redirect("/shop")
        }
        else {
            req.flash("error","Email or password incorrect")
            res.redirect("/")
        }
    })
}

module.exports.logOut = (req, res)=>{
    res.cookie("token"," ")
    res.redirect("/")
}