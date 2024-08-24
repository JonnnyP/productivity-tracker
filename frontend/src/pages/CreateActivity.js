import { h, Component , render} from 'preact'

class CreateActivityForm extends Component {
    state = { value: '' }
    
    onSubmit = e => {
        alert("Form Submitted")
        e.preventDefault()
    }

    onInput = e => {
        this.setState({ value: e.currentTarget.value })
    }

    render(_, {value}) {
        return(
            <div>
                <h2>Add New Acitivity</h2>
                <form onSubmit={this.onSubmit}>
                    <label>Type </label> <br></br>
                    <select value={value} onChange={this.onChange}>
                        <option value="productive">productive</option>
                        <option value="exercise">exercise</option>
                        <option value="hobby">hobby</option>
                        <option value="learning">learning</option>
                        <option value="reading">reading</option>
                        <option value="mindful">mindful</option>
                    </select>
                    <br></br><br></br>
                    <label>Description </label><br></br>
                    <textarea type="text" value={value} onInput={this.onInput} />
                    <br></br><br></br>
                    <label>Duration (Minutes) </label><br></br>
                    <input type="number" id="duration" name="duration" min="1" max="120" />
                    <br></br><br></br>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateActivityForm