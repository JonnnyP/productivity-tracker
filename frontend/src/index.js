import { h, render } from 'preact'
import App from './App'
import { StatsProvider } from './contexts/StatsContext'

render(
	<StatsProvider>
		<App />
	</StatsProvider>,
	document.body
);