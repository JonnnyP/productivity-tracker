import { h, Component } from 'preact'
import { useContext } from 'preact/hooks';
import { PieChart, Pie, Cell } from 'recharts'
import Header from '../components/Header'
import StatsContext from '../contexts/StatsContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#b0ffdb'];
  
const Stats = () => {
    const { stats, loading } = useContext(StatsContext)

    if (loading) return <div>Loading stats...</div>
    if (!stats) return <div>No stats available :c</div>

    const data = stats.groupedData.map((item, index) => ({
        name: item.type || `Type ${index + 1}`,
        value: item.totalDuration || 0,
    }));

    console.log(data)
    return (
        <div>
            <Header />
            <h1>Stats</h1>
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    dataKey="value" // Required: specifies the property for the value
                    nameKey="name" // Specifies the property for the category names
                    cx="50%" // X-coordinate of the chart center
                    cy="50%" // Y-coordinate of the chart center
                    outerRadius={100} // Size of the Pie Chart
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    )
}

export default Stats