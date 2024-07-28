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

const getSpecificUserActivities = async (req,res) => {
    try {
        const { userId } = req.params

        const activities = await Activity.findAll({
            where:  { userId},
            include: [{
                model: User,
                attributes: ['id','username','email']
            }]
        })

        if ( activities.length === 0 ) {
            return res.status(404).json({ message: 'No activities found for this user'})
        }

        res.status(200).json(activities)
    } catch (err) {
        console.log('Error retrieving activities for user:', err);
        res.status(500).json({error: err.message})
    }
}

const updateActivity = async (req,res) => {
    try {
        const { id } = req.params
        const {type, description, duration} = req.body

        const activity = await Activity.findByPk(id)

        if(!activity) {
            return res.status(404).json({error: 'Activity not found'})
        }

        if (type && !['productive', 'exercise', 'hobby'].includes(type)) {
            return res.status(400).json({ error: 'Invalid type' });
        }

        activity.type = type || activity.type;
        activity.description = description || activity.description;
        activity.duration = duration || activity.duration;
    
        await activity.save();
    
        res.status(200).json(activity);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const deleteActivity = async (req,res) => {
    try {
        const { id } = req.params;

        const activity = await Activity.findByPk(id);
        if (!activity) {
          return res.status(404).json({ error: 'Activity not found' });
        }
    
        await activity.destroy();
    
        res.status(204).json({ message: 'Activity deleted successfully' });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createActivity,
    getAllActivities,
    getSpecificUserActivities,
    updateActivity,
    deleteActivity,
}