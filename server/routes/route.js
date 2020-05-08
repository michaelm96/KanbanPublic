const router = require('express').Router()
const userController = require('../controller/userController')
const taskRoute = require('./taskRoutes')
const authentication = require('../middlewares/authentication')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleLogin', userController.googleLogin)
router.use('/task', taskRoute)

module.exports = router