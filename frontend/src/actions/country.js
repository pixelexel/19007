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
 
export const getCountryData = (data) => {
	return (dispatch) => {
		console.log('get country ', data)
		dispatch(requestCountryData())

		const url = data.filters.start_date && data.filters.end_date ? `get_country_data?start=${data.filters.start_date}&end=${data.filters.end_date}` : `get_country_data`

		return fetch(BASE_API_URL + url ,{
			credentials:"same-origin"
		})
				.then(data => data.json())
				.then(json => dispatch(receiveCountryData(json.error, json)))
				.catch(err => dispatch(receiveCountryData(false,countryData() )))
	}
}