const Activity = require('../models/activityModel')
const User = require('../models/userModel')
const { Op } = require('sequelize')
const sequelize = require('../config/db')

const buildWhereClause = (type, dateRange, userId) => {
    const where = {}
    
    if(dateRange) {
        const [start, end] = dateRange.split(',')
        where.date = { [Op.between]: [new Date(start), new Date(end)] }
    }

    if(type) where.type = type

    if(userId) where.userId = userId

    return where
}

const fetchTotalStats = async (where) => {
    const totalActivites = await Activity.count({ where })
    const totalDuration = await Activity.sum('duration', { where })

    return { totalActivites, totalDuration }
}

const fetchGroupedByDay = async (where) => {
    return await Activity.findAll({
        attributes: [
            [sequelize.fn('DATE', sequelize.col('date')), 'day'],
            [sequelize.fn('COUNT', sequelize.col('*')), 'activityCount'],
        ],
        where,
        group: ['day'],
    })
}

const fetchGroupedByType = async(where) => {
    return await Activity.findAll({
        attributes: [
            'type',
            [sequelize.fn('SUM', sequelize.col('duration')), 'totalDuration'],
            [sequelize.fn('COUNT', sequelize.col('*')), 'count'],
        ],
        where,
        group: ['type']
    })
}

const fetchGroupedByDayandType = async (where) => {
    const data = await Activity.findAll({
        attributes: [
            [sequelize.fn('DATE', sequelize.col('date')), 'day'],
            'type',
            [sequelize.fn('SUM', sequelize.col('duration')), 'totalDuration'],
        ],
        where,
        group: [sequelize.fn('DATE', sequelize.col('date')), 'type'],
        order: [[sequelize.fn('DATE', sequelize.col('date')), 'ASC']],
    })

    return data.map((row) => ({
        day: row.dataValues.day,
        type: row.type,
        duration: Number(row.dataValues.totalDuration),
    }))
}

const getStats = async (req, res) => {
    try {
        const { userId } = req.params
        const { type, dateRange, groupBy } = req.query

        const where = buildWhereClause(type, dateRange, userId)
        const { totalActivites, totalDuration } = await fetchTotalStats(where)

        let responseData;

        switch (groupBy) {
            case 'day':
                responseData = await fetchGroupedByDay(where)
                break
            case 'type':
                responseData = await fetchGroupedByType(where)
                break
            case 'dayandtype':
            case 'typeandday':
            case 'all':
                responseData = await fetchGroupedByDayandType(where)
                break
            default:
                responseData = []
        }

        res.json({
            totalActivites,
            totalDuration,
            responseData,
        })
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = { getStats }