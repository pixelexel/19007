import { BASE_API_URL } from '../config'

export const REQUEST_DISTRICT_DATA = 'REQUEST_DISTRICT_DATA'
export const RECEIVE_DISTRICT_DATA = 'RECEIVE_DISTRICT_DATA'

const requestDistrictData = () => ({
	type: REQUEST_DISTRICT_DATA,
})

const receiveDistrictData = (error, data) => ({
	type: RECEIVE_DISTRICT_DATA, 
	data: data,
	error: error,
})
 
export const getDistrictData = (id) => {
	return (dispatch) => {
		dispatch(requestDistrictData())
		return fetch(BASE_API_URL + 'get_district_data/' + id)
				.then(data => data.json())
				.then(json => dispatch(receiveDistrictData(json.error, json)))
				.catch(err => dispatch(receiveDistrictData(false)))
	}
}