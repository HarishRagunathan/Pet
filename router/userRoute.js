const express=require('express')
const { Registeration, Login } = require('../controller/user')
const route = express.Router()

route.post('/registeration',Registeration)
route.post('/login',Login)

module.exports=route