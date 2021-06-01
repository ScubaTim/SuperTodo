import todos from './routes/todos.js'
import signUp from './routes/signUp.js'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/todos", todos)
app.use("/api/signup", signUp)

app.get("/", (req, res) => {
    res.send("Welcome to SuperTodo's API!")
})

const url = process.env.MONGODB_URI
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server listening on port ${port}`))

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB connection established successfully"))
    .catch((err) => console.error(`MongoDB connection failed with error: ${err}`))