const userModel = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
require("dotenv").config();

const test = (req,res) => {
    res.json('test is working')
}

const registerUser = async (req,res) => {
    try{
        const {name, email, password} = req.body;
        const exists = await userModel.findOne({email});
        if(!password || password.length < 6){
            return res.json({
                error: 'password is required and shoud be atleast 6 characters long'
            })
        };
        if(exists){
            return res.json({
                error: 'email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await new userModel({
            name, 
            email, 
            password: hashedPassword,
        })
        await user.save()
        return res.json(user)
    }
    catch(error){
        console.log(error)
    }
}

const loginUser = async (req,res) => {
    try{
        const {email, password} = req.body;
        const users = await userModel.findOne({email});
        if(!users){
            res.json({error: 'user not registered'})
        }
        const validPassword = await bcrypt.compare(password, users.password)
        if(!validPassword){
            res.json({error: 'incorrect password'})
        }
        else{
            const token = await jwt.sign({_id: users._id}, process.env.JWT_KEY, {expiresIn: '1h'})
            res.cookie('token', token)
            res.json({data: token})
        }
    }
    catch(error){
        console.log(error)
    }
}

const forgotPassword = async (req,res) => {
    const {email} = req.body
    try{
        const users = await userModel.findOne({email})
        if(!users){
            return res.json({error: 'user not found'})
        }
        const token = jwt.sign({id: users._id}, process.env.JWT_KEY)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'saihomesrs@gmail.com',
                pass: 'dqcb ygzk nsee qfiv'
            }
        });
        const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E")
        var mailOptions = {
            from: 'saihomesrs@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPassword/${encodedToken}`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return res.json({error: 'error sending email'})
            } 
            else {
                return res.json('Email sent')
            }
        });
    }
    catch(error){
        console.log(error)
    }
}

const resetPassword = async(req, res) => {
    const token = req.params.token
    const password = req.body.password
    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const id = decoded.id
        const hashedPassword = await bcrypt.hash(password, 12)
        await userModel.findByIdAndUpdate({_id: id}, {password: hashedPassword})
        return res.json("updated password")
    }
    catch(err){
        return res.json({error: err})
    }
}

const profile = async(req,res) => {
    const tokenn = await req.cookies.token;
    try{
        if(tokenn){
            const decoded = jwt.verify(tokenn, process.env.JWT_KEY)
            const user_profile = await userModel.findById(decoded._id)
            res.json(user_profile)
        }
        else{
            res.json({error: "pls login"})
        }
    }
    catch(err){
        return res.json(err)
    }
}

const logout = (req,res) => {
    res.clearCookie('token')
    return res.json({status: true})
}
module.exports = {
    test,
    registerUser,
    loginUser,
    profile,
    logout,
    forgotPassword,
    resetPassword,
}
