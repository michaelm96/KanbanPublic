const { Task } = require('../models')
const { User } = require('../models')

class TaskController {
    static readTask(req, res, next) {
        // const { id } = req.userData
        Task.findAll({
            include: [{model:User}]
        })
            .then(data => {
                if (!data) {
                    next({ name: 'Data not found' })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static createTask(req, res, next) {
        const { title, category } = req.body
        const { id } = req.userData

        Task.create({
            title,
            category,
            UserId: id
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static editTask(req, res, next) {
        const { id } = req.params

        Task.findByPk(id)
            .then(task => {
                if (!task) {
                    next({ name: 'Data not found' })
                } else {
                    res.status(200).json(task)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateTask(req, res, next) {
        const { title, category } = req.body
        const { id } = req.params

        Task.update({
            title,
            category
        }, { where: { id } })
            .then(task => {
                if (!task) {
                    next({ name: 'Data not found' })
                } else {
                    res.status(200).json(task)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteTask(req, res, next) {
        const { id } = req.params

        Task.destroy({
            where: { id }
        })
            .then(data => {
                if (!data) {
                    next({ name: 'Data not found' })
                } else {
                    res.status(200).json({ message: 'data succesfully deleted' })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TaskController