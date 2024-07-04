const User = require('../models/userModel')

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const newUser = await User.create({ username, email, password })
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ error: err.message})
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}