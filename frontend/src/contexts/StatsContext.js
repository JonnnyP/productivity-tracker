import { createContext } from 'preact'
import { useState, useEffect } from 'preact/hooks'

const StatsContext = createContext()

export const StatsProvider = ({ children }) => {
    // const [stats, setStats] = useState(null)

    const [statsByType, setStatsByType] = useState(null)
    const [statsByDayAndType,  setStatsByDayAndType] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchStatsByType = async () => {
        try {
            setLoading(true)
            const response = await fetch('http://localhost:5001/api/stats?groupBy=type')

            if(!response.ok) throw new Error('Failed to fetch stats by type')
            const data = await response.json()
            setStatsByType(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const fetchStatsByDayAndType = async () => {
        try {
            setLoading(true)
            const response = await fetch('http://localhost:5001/api/stats?groupBy=dayandtype')

            if(!response.ok) throw new Error('Failed to fetch stats by day and type')
            const data = await response.json()
            setStatsByDayAndType(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const fetchAllStats = async() => {
        await Promise.all([fetchStatsByType(), fetchStatsByDayAndType()])
    }

    const updateStats = async (options = {}) => {
        await fetchAllStats(options)
    }

    useEffect(() => {
        fetchAllStats()
    }, [])

    return (
        <StatsContext.Provider 
            value={{ 
                statsByType,
                statsByDayAndType,
                loading,
                error,
                fetchStatsByType,
                fetchStatsByDayAndType,
                updateStats
            }}
        >
            {children}
        </StatsContext.Provider>
    )
}

export default StatsContext