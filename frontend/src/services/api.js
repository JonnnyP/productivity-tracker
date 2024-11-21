// const API_URL = process.env.APP_API_URL
const API_URL = 'http://localhost:5001/api'

const getAllActivities = async () => {
    const response = await fetch(`${API_URL}/activities`)
    return await response.json()
}

// const fetchStats = async () => {
//     const response = await fetch(`${API_URL}/stats`)
//     return await response.json()
// }

module.exports = {
    getAllActivities,
    // fetchStats,
}