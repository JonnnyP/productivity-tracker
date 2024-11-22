import { h, Component , render} from 'preact'
import  { route } from 'preact-router'
import { useContext } from 'preact/hooks'
import StatsContext from '../contexts/StatsContext'
import Header from '../components/Header'

class CreateActivityForm extends Component {
    static contextType = StatsContext

    state = { 
        type: '',
        description: '',
        duration: '',
    }
    
    handleChange = e => {
        this.setState({ [e.target.name]: e.currentTarget.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const {type, description, duration } = this.state
        const userId = 3

        const data = {
            type, 
            description, 
            duration,
            userId
        }

        try {
            const response = await fetch ('http://localhost:5001/api/activities/createNewActivity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            
            if(response.ok) {
                const jsonResponse = await response.json()
                console.log('Activity created:', jsonResponse)

                this.setState({type: '', description: '', duration: ''})
                
                await this.context.updateStats()
                route('/');
            } else {
                const errorMessage = await response.text(); // Fetch error details from the response body
                console.error('Error:', errorMessage);            
            }

        } catch (error) {
            console.log("Error: ", error)
        }
    }

    render() {

        const {type, description, duration } = this.state

        return(
            <div>
                <Header />
                <h1>Add New Acitivity</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Type </label> <br></br>
                    <select name="type" value={type} onChange={this.handleChange}>
                        <option value="" disabled>Select an activity type</option>
                        <option value="productive">productive</option>
                        <option value="exercise">exercise</option>
                        <option value="hobby">hobby</option>
                        <option value="learning">learning</option>
                        <option value="reading">reading</option>
                        <option value="mindful">mindful</option>
                    </select>
                    <br></br><br></br>
                    <label>Description </label><br></br>
                    <textarea type="text" name="description" value={description} onChange={this.handleChange} placeholder="Describe your activity..."/>
                    <br></br><br></br>
                    <label>Duration (Minutes) </label><br></br>
                    <input type="number" name="duration" value={duration} onChange={this.handleChange} min="1" max="120"/>
                    <br></br><br></br>
                    <button type="submit">Create Activity</button>
                </form>
            </div>
        )
    }
}

export default CreateActivityForm