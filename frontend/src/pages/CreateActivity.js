import { h, Component , render} from 'preact'

class CreateActivityForm extends Component {
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
        const data = {type, description, duration, userId}

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
            } else {
                console.error('Error', error)
            }

        } catch (error) {
            console.log("Error: ", error)
        }
    }

    render() {

        const {type, description, duration } = this.state

        return(
            <div>
                <h2>Add New Acitivity</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Type </label> <br></br>
                    <select name="type" value={type} onChange={this.handleChange}>
                        <option value="productive">productive</option>
                        <option value="exercise">exercise</option>
                        <option value="hobby">hobby</option>
                        <option value="learning">learning</option>
                        <option value="reading">reading</option>
                        <option value="mindful">mindful</option>
                    </select>
                    <br></br><br></br>
                    <label>Description </label><br></br>
                    <textarea type="text" name="description" value={description} onChange={this.handleChange} />
                    <br></br><br></br>
                    <label>Duration (Minutes) </label><br></br>
                    <input type="number" name="duration" value={duration} onChange={this.handleChange} min="1" max="120"  />
                    <br></br><br></br>
                    <button type="submit">Create Activity</button>
                </form>
            </div>
        )
    }
}

export default CreateActivityForm