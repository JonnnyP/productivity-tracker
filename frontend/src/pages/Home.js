import { h, Component} from 'preact'
import Header from '../components/Header'
import ActivityList from '../components/ActivityList'

class Home extends Component {
    render() {
        return(
            <div>
                <Header />
                <h1>Home</h1>
                <ActivityList />
            </div>
        )
    }
}

export default Home