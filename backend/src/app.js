const express = require('express')
const app = express()

app.use(express.json())

const userRoutes = require('./routes/userRoutes')
const activityRoutes = require('./routes/activityRoutes')

app.use('/api/users', userRoutes)
app.use('/api/activities', activityRoutes)

module.exports = app