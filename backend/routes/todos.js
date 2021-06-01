import { Todo } from '../models/todo.js'
import express from 'express'
import Joi from 'joi'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find()
            .sort({ date: -1 })

        res.send(todos)
    } catch (err) {
        res.status(500).send(err.message)
        console.log(err.message)
    }
})

router.post('/', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(200).required(),
        author: Joi.string().min(3).max(30),
        uid: Joi.string(),
        isComplete: Joi.boolean(),
        date: Joi.date()
    })

    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const { name, author, uid, isComplete, date } = req.body

    let todo = new Todo({
        name,
        author,
        uid,
        isComplete,
        date
    })

    try {
        todo = await todo.save()
        res.send(todo)
    } catch (err) {
        res.status(500).send(err.message)
        console.log(`There was an error making a post request: ${err}`)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id)

        res.send(deletedTodo)
    } catch (err) {
        res.status(500).send(err.message)
        console.log(err.message)
    }
})

export default router