const Activity = require('../models/activityModel')
const User = require('../models/userModel');

const createActivity = async (req,res) => {
    try {
        const {type, description, duration, userId} = req.body

        const user = await User.findByPk(userId);
        
        if (!user) {
          return res.status(400).json({ error: 'User not found' });
        }

        const newActivity = await Activity.create({
            type, 
            description, 
            duration, 
            userId,
        })
            
        res.status(201).json(newActivity)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const getAllActivities = async (req,res) => {
    try {
        const activities = await Activity.findAll()
        res.status(200).json(activities)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    createActivity,
    getAllActivities,
}