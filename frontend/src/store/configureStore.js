import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import studentApp from '../reducers'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

const loggerMiddleware = createLogger()
export const history = createHistory()
const reactRouterMiddleware = routerMiddleware(history)

export default function configureStore() {
	const store = createStore(studentApp, 
		applyMiddleware(thunkMiddleware, loggerMiddleware, reactRouterMiddleware));

	if (module.hot) {
	      module.hot.accept('../reducers', () => {
	      	console.log('hot store')
	        store.replaceReducer(studentApp)
	    })
	}
	return store;
}