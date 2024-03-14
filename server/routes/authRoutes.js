const express = require('express')
const router = express.Router()
const cors = require('cors')
const { test,registerUser,loginUser,logout, profile, forgotPassword, resetPassword } = require('../Controllers/authControllers')

//middleware

router.use(
    cors({
        credentials: true,
        origin: ['http://localhost:5173', 'https://mern-authentication-23df.onrender.com'],
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/logIn', loginUser)
router.get('/profile', profile)
router.get('/logout', logout)
router.post('/forgotPassword', forgotPassword)
router.put('/resetPassword/:token', resetPassword)


module.exports = router
