require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 200})
}

const axios = require('axios')

const forgotpassword = async (req, res) => {
    
    const body = req.body
    const user = await User.findOne({email: body.email})
    
    if (!user) {
        return res.status(404).send({message: "User not found."})
    }
    
    const token = generateToken({id: user.id})
    const url = `${process.env.URL_TELEGRAM}Token to update password: ${token}`
    axios.post(url)

    res.send({message: "Token send telegram."})
}

const resetpassword = async (req, res) => {
    
    const body = req.body
    const user = await User.findOne({email: body.email})
    
    if (!user) {
        return res.status(404).send({message: "User not found."})
    }
    user.password = body.password
    
    await user.save()

    res.send({message: "Update password."})
}

module.exports = {forgotpassword, resetpassword}