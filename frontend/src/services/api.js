// const API_URL = process.env.APP_API_URL
const API_URL = 'http://localhost:5001/api'

const getAllActivities = async () => {
    const response = await fetch(`${API_URL}/activities/user/3`)
    return await response.json()
}

module.exports = {
    getAllActivities,
}