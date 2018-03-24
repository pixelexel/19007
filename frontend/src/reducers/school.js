import { REQUEST_SCHOOL_DATA, RECEIVE_SCHOOL_DATA } from '../actions/school'

const initialState = {
	pp_data : [],
	no_ss : [],
	ex_curr : [],
	fetchingData: false
}

const schoolData = (state = initialState, action) => {
	let { data, type } = action.data || {}
	
	switch(action.type){
		case REQUEST_SCHOOL_DATA:
			return Object.assign({}, state, {
				fetchingData: true
			})

		case RECEIVE_SCHOOL_DATA: {
			let ret = Object.assign({}, state, action.data )
			ret['fetchingData'] = false
			return ret
		}

		default:
			return state
	}
}

export default schoolData