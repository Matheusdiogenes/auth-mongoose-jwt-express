require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const User = require('../models/user')

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 200})
}

const register = async (req, res) => {    
    try {
        const user = req.body        
        
        if (await User.findOne({email: user.email})) {
            return res.send({message: "User already exists."})    
        }        
        
        await User.create(user)        
        user.password = undefined
        
        return res.send({
            user: user,
            token: generateToken({id: user.id})
        })
        
    } catch (error) {
        return res.send({
            error: error.message
        })
    }
}

const login = async (req, res) => {    
    const {email, password} = req.body

    const user = await User.findOne({email: email}).select("+password")
    
    if (!user) {
        return res.status(404).send({message: "Invalid email or password."})
    }

    const match = await bcrypt.compare(password.toString(), user.password)
    
    if (!match) {
        return res.status(404).send({message: "Invalid email or password."})
    }
    
    user.password = undefined
    return res.status(200).send({ user: user, token: generateToken( {id: user.id} )})
}

module.exports = {
    register,
    login,
}