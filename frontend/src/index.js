import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { Provider } from 'react-redux'

import studentApp from './reducers'

import App from './App'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './store/configureStore'


const store = configureStore()


function renderApp(){
	ReactDOM.render(
		<Provider store={store}>
			<App/>
		</Provider>, 
		document.getElementById('root')
	)
}


if(module.hot){
	module.hot.accept('./App', ()=>{
		renderApp()
	})
}

renderApp()
registerServiceWorker()
