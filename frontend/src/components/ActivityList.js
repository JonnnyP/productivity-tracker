import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { getAllActivities } from '../services/api'
import '../styles/ActivityList.css'

const ActivityList = () => {
    const [activities, setActivities] = useState([])

    useEffect( () => {
        getAllActivities().then(setActivities)
    }, [])

    return (
        <div>
            <h2>Activities</h2>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map(activity => (
                        <tr key={activity.id}>
                            <td>{activity.type}</td>
                            <td>{activity.description}</td>
                            <td>{activity.duration}</td>
                            <td>{activity.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ActivityList