import { BASE_API_URL } from '../config'

export const REQUEST_STATE_DATA = 'REQUEST_STATE_DATA'
export const RECEIVE_STATE_DATA = 'RECEIVE_STATE_DATA'

const requestStateData = () => ({
	type: REQUEST_STATE_DATA,
})

const receiveStateData = (error, data) => ({
	type: RECEIVE_STATE_DATA, 
	data: data,
	error: error,
})
 
export const getStateData = (id, data) => {
	return (dispatch) => {
		dispatch(requestStateData())
		const url = data.filters.start_date && data.filters.end_date ? `get_state_data/${data.filters.start_date}/${data.filters.end_date}` : `get_state_data`

		return fetch(BASE_API_URL + url,{
			credentials:"same-origin"
		})
				.then(data => data.json())
				.then(json => dispatch(receiveStateData(json.error, json)))
				.catch(err => dispatch(receiveStateData(false)))
	}
}