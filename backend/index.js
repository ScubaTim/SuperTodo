require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')



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