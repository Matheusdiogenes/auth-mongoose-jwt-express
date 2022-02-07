require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const credentials = req.headers.authorization  
    
    if (!credentials) return res.status(401).send({ message: "No token provided." })    
     
    const [ typeToken, token ] = credentials.split(' ') 
    
    if(!token) return res.status(401).send({ message: "No token provided." })
     
    jwt.verify(token, process.env.SECRET_KEY, (err , decoded) => {        
        if(err) return res.status(401).send({ message: "Token invalid/Unauthorized." }) 
        
        req.userID = decoded.id
        return next()
    })
}

module.exports = verifyJWT