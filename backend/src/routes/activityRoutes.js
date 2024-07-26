const express = require('express')
const router = express.Router()
const activityController = require('../controllers/activityController')

router.post('/activities', activityController.createTask)
router.get('/activities', activityController.getAllTasks)

module.exports = router