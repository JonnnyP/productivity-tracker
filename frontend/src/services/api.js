// const API_URL = process.env.APP_API_URL
const API_URL = 'http://localhost:5001/api'

export const getAllActivities = async () => {
    const response = await fetch(`${API_URL}/activities`)
    return await response.json()
}
