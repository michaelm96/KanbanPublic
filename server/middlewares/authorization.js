const { Task } = require('../models')

const authorization = (req,res,next) => {
    const { id } = req.params

    Task.findByPk(id)
    .then(task =>{
        if(!task){
            next({name: 'Task not found'})
        }else if(task.UserId !== req.userData.id){
            next({name : 'Forbidden Access'})
        }else{
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization