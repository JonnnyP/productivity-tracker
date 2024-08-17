import { h } from 'preact'
import { Router } from 'preact-router'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import CreateActivity from './pages/CreateActivity'

const App = () => (
    <div id="app">
        <Router>
            <Home path="/" />
            <About path="/about" />
            <Login path="/login" />
            <CreateActivity path="/activity" />
        </Router>
    </div>
)

export default App