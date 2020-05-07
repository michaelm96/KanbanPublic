require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

const generateToken = (user) =>{
    const { id,first_name,last_name,email,organization } = user

    return jwt.sign({ id,first_name,last_name,email,organization }, secretKey);
}

module.exports = { generateToken }