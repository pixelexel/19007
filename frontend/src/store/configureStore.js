import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import studentApp from '../reducers'

const loggerMiddleware = createLogger()

export default function configureStore() {
	const store = createStore(studentApp, 
		applyMiddleware(thunkMiddleware, loggerMiddleware));

	if (module.hot) {
	      module.hot.accept('../reducers', () => {
	      	console.log('hot store')
	        store.replaceReducer(studentApp)
	    })
	}
	return store;
}