import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { Todo } from './models/Todo.js'

dotenv.config()

const app = express()

app.get("/", (req, res) => {
    res.send("Welcome to SuperTodo's API!")
})

const url = process.env.MONGODB_URI
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server listening on port ${port}`))

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connection established successfully"))
    .catch((err) => console.error(`MongoDB connection failed with error: ${err}`))