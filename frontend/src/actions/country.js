import { BASE_API_URL } from '../config'
import  { countryData } from '../samples'

export const REQUEST_COUNTRY_DATA = 'REQUEST_COUNTRY_DATA'
export const RECEIVE_COUNTRY_DATA = 'RECEIVE_COUNTRY_DATA'

const requestCountryData = () => ({
	type: REQUEST_COUNTRY_DATA,
})

const receiveCountryData = (error, data) => ({
	type: RECEIVE_COUNTRY_DATA, 
	data: data,
	error: error,
})
 
export const getCountryData = () => {
	return (dispatch) => {
		dispatch(requestCountryData())
		return fetch(BASE_API_URL + 'get_country_data/',{
			credentials:"same-origin"
		})
				.then(data => data.json())
				.then(json => dispatch(receiveCountryData(json.error, json)))
				.catch(err => dispatch(receiveCountryData(false,countryData() )))
	}
}