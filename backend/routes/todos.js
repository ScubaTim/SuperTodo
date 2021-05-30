import { Todo } from '../models/todo.js'
import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
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

export default router