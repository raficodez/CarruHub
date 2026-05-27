const express = require('express')
const userModel = require('../models/usermodel')
const router = express.Router()
const { registerUser, loginUser, logOut } = require('../controllers/authController')
const { generateToken } = require('../utils/generateToken')



router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout',logOut)





module.exports = router;