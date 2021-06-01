import { User } from '../models/user.js'
import express from 'express'
import Joi from 'joi'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post("/", async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(200).email().required(),
        password: Joi.string().min(6).max(200).required()
    })

    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    try {
        const { name, email, password } = req.body

        let user = await User.findOne({ email })

        if (user) return res.status(400).send("User with this email already exists.")

        user = new User({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        await user.save()

        res.send("User created.")

    } catch (err) {
        res.status(500).send(err.message)
        console.log(err.message)
    }
})

export default router