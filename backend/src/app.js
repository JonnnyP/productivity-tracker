const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:8080'
}))
const userRoutes = require('./routes/userRoutes')
const activityRoutes = require('./routes/activityRoutes')
const statsRoutes = require('./routes/statsRoutes')

app.use('/api/users', userRoutes)
app.use('/api/activities', activityRoutes)
app.use('/api/stats', statsRoutes)

module.exports = app