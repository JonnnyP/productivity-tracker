const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:8080'
}))
const userRoutes = require('./routes/userRoutes')
const activityRoutes = require('./routes/activityRoutes')

app.use('/api/users', userRoutes)
app.use('/api/activities', activityRoutes)

module.exports = app