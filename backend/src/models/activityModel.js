const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const User = require('./userModel')

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
        type: DataTypes.DATE, // Store the date with time
        allowNull: false,
        defaultValue: Sequelize.NOW,
        get() {
            const rawDate = this.getDataValue('date');
            if (!rawDate) return null;
            // Format the date to a more human-readable format, including 12-hour time
            const options = {
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: 'numeric', 
                hour12: true // Ensures 12-hour format
            };
            return rawDate.toLocaleString('en-US', options);
        }
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
})

Activity.belongsTo(User, { foreignKey: 'userId'})
User.hasMany(Activity, { foreignKey: 'userId'})

module.exports = Activity