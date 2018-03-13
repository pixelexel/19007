import {REQUEST_SEARCH, RECEIVE_SEARCH} from '../actions'

function search(
	state = {
		isFetching: false,
		data: [],
	}, action){
	
	switch(action.type){
		case REQUEST_SEARCH:
			return Object.assign({}, state, {
				isFetching: true,
			})

		case RECEIVE_SEARCH:
			return Object.assign({}, state, {
				isFetching: false,
				data: action.data
			})
			
		default:
			return state
	}
}

export default search