import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import studentApp from '../reducers'

const loggerMiddleware = createLogger()

export default function configureStore() {
	if (module.hot) {
	      module.hot.accept('../reducers', () => {
	        store.replaceReducer(studentApp)
	    })
	}

	const store = createStore(studentApp, 
		applyMiddleware(thunkMiddleware, loggerMiddleware));
	return store;
}