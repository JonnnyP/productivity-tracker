const express = require('express')
const router = express.Router()
const activityController = require('../controllers/activityController')

router.post('/createNewActivity', activityController.createActivity)
router.get('/user/:userId', activityController.getSpecificUserActivities)
router.get('/', activityController.getAllActivities)
router.put('/activities/;id', activityController.updateActivity)

module.exports = router