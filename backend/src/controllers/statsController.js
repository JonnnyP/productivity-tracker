const Activity = require('../models/activityModel')
const { Op } = require('sequelize')
const sequelize = require('../config/db')

const getStats = async (req, res) => {
    try {
        const { type, dateRange, groupBy } = req.query

        const where = {}

        if(dateRange) {
            const [start, end] = dateRange.split(',')
            where.date = { [Op.between]: [new Date(start), new Date(end)] }
        }

        if(type) {
            where.type = type
        }

        const totalActivites = await Activity.count({ where })
        const totalDuration = await Activity.sum('duration', { where })

        const typeCounts = await Activity.findAll({
            attributes: ['type', [sequelize.fn('COUNT', sequelize.col('type')), 'count']],
            where,
            group: ['type'],
            order: [[sequelize.fn('COUNT', sequelize.col('type')), 'DESC']],
        })

        const mostFrequentType = typeCounts.length > 0 ? typeCounts[0].type: null

        let groupedData = []
        if(groupBy === 'day') {
            groupedData = await Activity.findAll({
                attributes: [
                    [sequelize.fn('DATE', sequelize.col('date')), 'day'],
                    [sequelize.fn('COUNT', sequelize.col('*')), 'activityCount']
                ],
                where,
                group: ['day']
            })
        } else if (groupBy === 'type') {
            groupedData = await Activity.findAll({
                attributes: [
                    'type',
                    [sequelize.fn('SUM', sequelize.col('duration')), 'totalDuration'],
                    [sequelize.fn('COUNT', sequelize.col('*')), 'count']
                ],
                where,
                group: ['type']
            })
        }

        res.json({
            totalActivites,
            totalDuration,
            mostFrequentType,
            groupedData,
        })
        
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = { getStats }