import { createContext } from 'preact'
import { useState, useEffect } from 'preact/hooks'

const StatsContext = createContext()

export const StatsProvider = ({ children }) => {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchStats = async () => {
        try {
            setLoading(true)
            const response = await fetch('http://localhost:5001/api/stats?groupBy=type')

            if(response.ok) {
                const data = await response.json()
                setStats(data)    
            } else {
                console.error('Failed to fetch stats')
            }
        } catch (error) {
            console.error('Error fetching stats: ', error)
        } finally {
            setLoading(false)
        }
    }

    const updateStats = async () => {
        await fetchStats()
    }

    useEffect(() => {
        fetchStats()
    }, [])

    return (
        <StatsContext.Provider value={{ stats, loading, updateStats }}>
            {children}
        </StatsContext.Provider>
    )
}

export default StatsContext