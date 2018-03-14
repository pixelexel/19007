import { combineReducers } from 'redux'
// Import reducers here
import searchStudent from './searchStudent'
import popup from './popup'

// Combine all reducers
// If you don't give a key, the name of the reducer is it's
// state's key

const studentApp = combineReducers({
	search: searchStudent,
	popup: popup,
})

export default studentApp