const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/generateToken')

class UserController{
    static register(req,res,next){
        const { first_name, last_name, email, password } = req.body

        User.create({
            first_name,
            last_name,
            email,
            password
        })
        .then(user =>{
            res.status(201).json(user)
        })
        .catch(err =>{
            next(err)
        })
    }

    static login(req,res,next){
        const { email,password } = req.body
        console.log(req.body);
        const error = {status: 400, message: 'Invalid email/password'}

        User.findOne({
            where: { email }
        })
        .then(user =>{
            if(!user || !bcrypt.compareSync(password, user.password)){
                throw error
            }else{
                const access_token = generateToken(user)
                req.headers = access_token
                res.status(200).json({ access_token })
            }
        })
        .catch(err =>{
            next({ name: err.message })
        })
    }
}

module.exports = UserController