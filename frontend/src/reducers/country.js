import { REQUEST_COUNTRY_DATA, RECEIVE_COUNTRY_DATA } from '../actions/country'

const initialState = {
	pp_data : [],
	no_ss : [],
	ex_curr : [],
	fetchingData: false
}


const countryData = (state = initialState, action) => {
	let { data, type } = action.data || {}
	
	switch(action.type){
		case REQUEST_COUNTRY_DATA:
			return Object.assign({}, state, {
				fetchingData: true
			})

		case RECEIVE_COUNTRY_DATA: {
			let ret = Object.assign({}, state, action.data )
			ret['fetchingData'] = false
			return ret
		}

		default:
			return state
	}
}

export default countryData