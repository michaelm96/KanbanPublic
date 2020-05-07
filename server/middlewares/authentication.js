require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

const authentication = (req,res,next) => {
    const { access_token } = req.headers
    if(!access_token){
        next({name: 'Token not found'})
        return
    }try{
        const decoded = jwt.verify(access_token, secretKey);
        req.userData = decoded
        next()
    }catch{
        res.status(500).json(err)
    }
}

module.exports = authentication