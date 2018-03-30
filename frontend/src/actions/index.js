// define and export action creators here
import fetch from 'cross-fetch'

const BASE_URL = 'http://localhost:8000/api'

/*
	export const ActionCreator = () => {
		return {
			type: action_type,
			data: data,
		}
	}

*/

export const REQUEST_SEARCH = 'REQUEST_SEARCH'
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH'

function requestSearch(query){
	return {
		type: REQUEST_SEARCH,
		query: query,
	}
}

function receiveSearch(error, data){
	return {
		type: RECEIVE_SEARCH,
		data: data,
		error: error,
	}
}

// API calls (Thunk action creators)
export function fetchSearchResults(query){
	return (dispatch) => {
		dispatch(requestSearch(query))
		return fetch(BASE_URL,{
			credentials:"same-origin"
		})
				.then(data => data.json())
				.then(json => dispatch(receiveSearch(json.error, json.data)))
	}
}