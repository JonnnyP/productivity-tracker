const express = require('express')
const router = express.Router()
const activityController = require('../controllers/activityController')

router.post('/createNewActivity', activityController.createActivity)
router.get('/user/:userId', activityController.getSpecificUserActivities)
router.get('/', activityController.getAllActivities)
router.put('/activity/:id', activityController.updateActivity)
router.delete('/activity/:id', activityController.deleteActivity)

module.exports = router