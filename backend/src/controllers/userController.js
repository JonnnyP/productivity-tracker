const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser = async (req, res) => {
    try {
        // Grabs the password value entered, hashes it with bcrypt and stores in a variable 
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        // Creates the new user with the values entered and the newly created hashed password
        const user = await User.create({ username: req.body.username, email: req.body.email, password: hashedPassword})
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const loginUser = async (req, res) => {
    
    // Grab user entered values for user
    const {name, password} = req.body

    // Postgres to search the database for a user matching in username
    const user = await User.findOne({ where: {name} })

    // Return 400 status since a user with that username was not found
    if(!user) return res.status(400).send('Cannot find user')
    
    try {
        // Compares the stored hashed password to the entered password
        if( await bcrypt.compare(password, user.password) ) {
            // Jwt stuff idk lol
            const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h' })
            res.json({ message: 'Success', token })
        } else {
            // Invalid credentials
            res.status(403).send('Not Allowed')
        }
    } catch(err) {
        res.status(500).json({error: err.message })
    }

}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
}