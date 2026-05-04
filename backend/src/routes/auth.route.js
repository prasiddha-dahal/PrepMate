const express = require('express');
const authRouter = express.Router();

const {register, login, logout, getMe} = require('../controllers/auth.controller')
const {authUser} = require('../middlewares/auth.middleware')

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/logout', logout)
authRouter.get('/get-me', authUser, getMe)  // this is protected route , only authenticated user can access it

module.exports = authRouter
