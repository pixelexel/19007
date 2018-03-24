import { REQUEST_DISTRICT_DATA, RECEIVE_DISTRICT_DATA } from '../actions/district'

const initialState = {
	pp_data : [],
	no_ss : [],
	ex_curr : [],
	fetchingData: false
}

const districtData = (state = initialState, action) => {
	let { data, type } = action.data || {}
	
	switch(action.type){
		case REQUEST_DISTRICT_DATA:
			return Object.assign({}, state, {
				fetchingData: true
			})

		case RECEIVE_DISTRICT_DATA: {
			let ret = Object.assign({}, state, action.data )
			ret['fetchingData'] = false
			return ret
		}

		default:
			return state
	}
}

export default districtData