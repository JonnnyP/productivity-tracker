const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Activity = sequelize.define('Activity', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('productive','exercise','hobby','learning','reading','mindful'),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
        allowNull: false,
    },
}, {})

module.exports = Activity