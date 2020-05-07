const router = require('express').Router()
const taskController = require('../controller/taskController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', taskController.readTask)
router.post('/', taskController.createTask)

router.get('/:id', authorization, taskController.editTask)
router.put('/:id', authorization, taskController.updateTask)
router.delete('/:id', authorization, taskController.deleteTask)

module.exports = router