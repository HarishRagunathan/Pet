const jwt = require('jsonwebtoken')
const bcrypt=require('bcrypt')
const UserModel = require('../model/userModel')

const jwt_screte = 'Hot-Cart'

exports.Registeration = async(req,res)=>{
    const {username,email,password,role}=req.body
    try{
        const exist= await UserModel.findOne({email})
        if(exist){
            return res.status(400).json({
                message:'User different mail Id User already exits on this'
            })
        }
        const salt= await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)
        UserModel.create({
            username,
            email,
            password:hashedpassword,
            role:role || 'user'
        })
        res.status(200).json({
            message:'User Registered successfully'
        })

    }catch(error){
        res.status(400).json({
            message:'Error occur while registeration',
            error
        })
    }
}

exports.Login = async(req,res)=>{
    const {email,password}=req.body
    try {
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).json({
                message:"User Not found"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(500).json({
                message:"Wrong password"
            })
        } 

        const token = await jwt.sign({id:user._id,email:user.email,role:user.role,username:user.username},jwt_screte,{expiresIn:'24h'})

        res.status(200).json({
            message:"User logged in",
            token,
            user
        })
    } catch (error) {
        res.status(400).json({
            message:"Error occur while Login",
            error:error.me
        })
    }
}