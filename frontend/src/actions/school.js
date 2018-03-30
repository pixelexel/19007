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
 
export const getSchoolData = (id, data) => {
	return (dispatch) => {
		dispatch(requestSchoolData())
		const url = data.filters.start_date && data.filters.end_date ? `get_school_data/${id.trim()}?start=${data.filters.start_date}&end=${data.filters.end_date}` : `get_school_data/${id.trim()}`

		return fetch(BASE_API_URL + url,{
			credentials:"same-origin"
		})
				.then(data => data.json())
				.then(json => dispatch(receiveSchoolData(json.error, json)))
				.catch(err => dispatch(receiveSchoolData(false)))
	}
}