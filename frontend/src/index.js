import { h, render } from 'preact'

import './styles/Reset.css'
import './styles/Global.css'

import App from './App'
import { StatsProvider } from './contexts/StatsContext'

render(
	<StatsProvider>
		<App />
	</StatsProvider>,
	document.body
);