import { useContext, useEffect } from 'preact/hooks';
import Header from '../components/Header'
import StatsContext from '../contexts/StatsContext';

import { 
    PieChart,
    Pie, 
    Cell, 
    Tooltip, 
    Label,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid, 
    Legend,
    ResponsiveContainer
} from 'recharts'

const activityTypes = ["productive", "exercise", "learning", "reading", "mindful", "hobby"];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4242', '#AA42ff'];
  
const Stats = () => {
    const {
      statsByType,
      statsByDayAndType,
      loading,
      error,
      fetchStatsByType,
      fetchStatsByDayAndType,
      updateStats
    } = useContext(StatsContext)

    useEffect(() => {
      if(!statsByType) fetchStatsByType()
      if(!statsByDayAndType) fetchStatsByDayAndType()
    }, [statsByType, statsByDayAndType])

    if (loading) return <div>Loading stats...</div>
    if (error) return <div>Error: {error}</div>
  
    if (!statsByType?.responseData) {
        console.log("Stats By Type not ready yet.");
        return <div>Loading chart data...</div>;
    }

    if (!statsByDayAndType?.responseData) {
      console.log("Stats By Type not ready yet.");
      return <div>Loading chart data...</div>;
    }

    const data = statsByType.responseData.map((item, index) => ({
        name: item.type || `Type ${index + 1}`,
        value: parseInt(item.totalDuration) || 0,
    }));

  const transformDataForLineGraph = (data, activityTypes) => {
    const grouped = {};

    data.forEach(({ day, type, duration }) => {
        if (!grouped[day]) {
            grouped[day] = { name: day }
        }
        grouped[day][type] = duration 
    });

    Object.values(grouped).forEach((dayData) => {
      activityTypes.forEach((type) => {
        if(!dayData[type]) {
          dayData[type] = 0
        }
      })
    })

    return Object.values(grouped);
  };

  const lineGraphData = transformDataForLineGraph(statsByDayAndType.responseData, activityTypes);

  // console.log(statsByDayAndType.responseData)
  // console.log(lineGraphData)
      
    return (
        <div>
            <ResponsiveContainer width={"98%"} height={300}>
            <Header />
            <h1>Stats</h1>
            <h3>Activity distributed by time</h3>
            
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    dataKey="value" // Required: specifies the property for the value
                    nameKey="name" // Specifies the property for the category names
                    cx="50%" // X-coordinate of the chart center
                    cy="50%" // Y-coordinate of the chart center
                    outerRadius={100} // Size of the Pie Chart
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
            <LineChart data={lineGraphData}>
                <CartesianGrid strokeDasharray="2 2"/>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                    type="monotone"
                    dataKey="exercise"
                    stroke="#0088FE"
                />
                <Line 
                    type="monotone"
                    dataKey="reading"
                    stroke="#00C49F"
                />  
                <Line 
                    type="monotone"
                    dataKey="learning"
                    stroke="#FFBB28"
                />  
                <Line 
                    type="monotone"
                    dataKey="productive"
                    stroke="#FF8042"
                />  
                <Line 
                    type="monotone"
                    dataKey="hobby"
                    stroke="#FF4242"
                />  
                <Line 
                    type="monotone"
                    dataKey="mindful"
                    stroke="#AA42ff"
                />  
            </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Stats