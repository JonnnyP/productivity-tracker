import { h, Component , render} from 'preact'

class LoginForm extends Component {
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
                <h2>Login</h2>
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={value} onInput={this.onInput}/>
                    <p>You typed this value: {value}</p>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default LoginForm