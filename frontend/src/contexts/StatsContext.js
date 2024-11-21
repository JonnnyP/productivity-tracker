import { createContext } from 'preact'
import { useState, useEffect } from 'preact/hooks'

const StatsContext = createContext()

export const StatsProvider = ({ children }) => {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch('http://localhost:5001/api/stats?groupBy=type')
                const data = await response.json()
                setStats(data)
            } catch (error) {
                console.error('Error fetching stats: ', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    return (
        <StatsContext.Provider value={{ stats, loading}}>
            {children}
        </StatsContext.Provider>
    )
}

export default StatsContext