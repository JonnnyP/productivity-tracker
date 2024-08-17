import { h, Component} from 'preact'
import ActivityList from '../components/ActivityList'

class Home extends Component {
    render() {
        return(
            <div>
                <h1>Home</h1>
                <ActivityList />
            </div>
        )
    }
}

export default Home