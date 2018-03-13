import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import studentApp from './reducers'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

const loggerMiddleware = createLogger()

const store = createStore(
	studentApp,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
)

registerServiceWorker()
