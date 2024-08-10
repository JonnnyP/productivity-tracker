import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { getAllActivities } from '../services/api'

const ActivityList = () => {
    const [activities, setActivities] = useState([])

    useEffect( () => {
        getAllActivities().then(setActivities)
    }, [])

    return (
        <div>
            <h1>Activities</h1>

            <table>
                <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                </tr>
                {activities.map(activity => (
                    <tr>
                        <td>{activity.type}</td>
                        <td>{activity.description}</td>
                        <td>{activity.duration}</td>
                        <td>{activity.date}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default ActivityList