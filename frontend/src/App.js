import { h } from 'preact'
import { Router } from 'preact-router'

import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import CreateActivity from './pages/CreateActivity'
import Stats from './pages/Stats'

const App = () => (
    <div id="app">
        <Router>
            <Home path="/" />
            <About path="/about" />
            <Login path="/login" />
            <CreateActivity path="/activity" />
            <Stats path="/stats" />
        </Router>
    </div>
)

export default App