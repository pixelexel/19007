import { BASE_API_URL } from '../config'

export const REQUEST_SCHOOL_DATA = 'REQUEST_SCHOOL_DATA'
export const RECEIVE_SCHOOL_DATA = 'RECEIVE_SCHOOL_DATA'

const requestSchoolData = () => ({
	type: REQUEST_SCHOOL_DATA,
})

const receiveSchoolData = (error, data) => ({
	type: RECEIVE_SCHOOL_DATA, 
	data: data,
	error: error,
})
 
export const getSchoolData = (id) => {
	return (dispatch) => {
		dispatch(requestSchoolData())
		return fetch(BASE_API_URL + 'get_school_data/' + id)
				.then(data => data.json())
				.then(json => dispatch(receiveSchoolData(json.error, json)))
				.catch(err => dispatch(receiveSchoolData(false)))
	}
}