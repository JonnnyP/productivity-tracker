// To sync postgres with users model

const sequelize = require('./config/db')
const User = require('./models/userModel')

const syncModels = async () => {
    try {
        await sequelize.sync({force: true})
        console.log('Database & tables created')
    } catch (error) {
        console.error('Error syncing database:', error)
    } finally {
        await sequelize.close()
    }
}

syncModels()