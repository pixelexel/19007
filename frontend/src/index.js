import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { history } from './store/configureStore'
import App from './App'
import configureStore from './store/configureStore'
import { ConnectedRouter } from 'react-router-redux'

const store = configureStore()

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
		<App/>
		</ConnectedRouter>
	</Provider>, 
	document.getElementById('root')
)