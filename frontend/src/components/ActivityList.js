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
            <ul>
                {activities.map(activity => (
                    <li key={activity.id}> {activity.description}</li>
                ))}
            </ul>
        </div>
    )
}

export default ActivityList