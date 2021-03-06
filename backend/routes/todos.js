import { Todo } from '../models/todo.js'
import auth from '../middleware/auth.js'
import express from 'express'
import Joi from 'joi'

const router = express.Router()

router.get('/', auth, async (req, res) => {
    try {
        const todos = await Todo.find().sort({ date: -1 })
        const filteredTodos = todos.filter(todo => todo.uid === req.user._id)
        res.send(filteredTodos)
    } catch (err) {
        res.status(500).send(err.message)
        console.log(err.message)
    }
});

router.post('/', auth, async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(200).required(),
        author: Joi.string().min(3).max(30),
        uid: Joi.string(),
        isComplete: Joi.boolean(),
        date: Joi.date()
    })

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)

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
});

router.put("/:id", auth, async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(200).required(),
        author: Joi.string().min(3).max(30),
        uid: Joi.string(),
        isComplete: Joi.boolean(),
        date: Joi.date()
    })

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    try {
        const todo = await Todo.findById(req.params.id)

        if (!todo) {
            console.log("Todo not found")
            return res.status(404).send("Todo not found.")
        }

        if (todo.uid !== req.user._id) return res.status(401).send("Todo update failed. Not authorized.")

        const { name, author, uid, isComplete, date } = req.body

        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { name, author, uid, isComplete, date }, { new: true })

        res.send(updatedTodo)

    } catch (err) {
        res.status(500).send(err.message)
        console.log(err.message)
    }
});

router.patch("/:id", auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)

        if (!todo) return res.status(404).send("Todo not found.")

        if (todo.uid !== req.user._id) {
            return res.status(401).send("Todo status change failed. Not authorized")
        }

        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { isComplete: !todo.isComplete }, { new: true })

        res.send(updatedTodo)

    } catch (err) {
        res.status(500).send(err.message)
        console.log(err.message)
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)

        if (!todo) return res.status(404).send("Todo not found.")

        if (todo.uid !== req.user._id) {
            return res.status(401).send("Todo deletion failed. Not authorized")
        }

        const deletedTodo = await Todo.findByIdAndDelete(req.params.id)

        res.send(deletedTodo)
    } catch (err) {
        res.status(500).send(err.message)
        console.log(err.message)
    }
});

export default router