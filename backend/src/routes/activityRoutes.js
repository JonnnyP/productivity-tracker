const express = require('express')
const router = express.Router()
const activityController = require('../controllers/activityController')

router.post('/createNewActivity', activityController.createActivity)
router.get('/', activityController.getAllActivities)

module.exports = router