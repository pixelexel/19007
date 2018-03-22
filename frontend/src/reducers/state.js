import { REQUEST_STATE_DATA, RECEIVE_STATE_DATA } from '../actions/state'

const initialState = {
	pp_data : [],
	no_ss : [],
	ex_curr : [],
	fetchingData: false
}
// 'alldata' consists of data, acad_data, sport_data, c_data, d_data, rank_data 
// refer components/student/GridSet.js 

const stateData = (state = initialState, action) => {
	let { data, type } = action.data || {}
	
	switch(action.type){
		case REQUEST_STATE_DATA:
			return Object.assign({}, state, {
				fetchingData: true
			})

		case RECEIVE_STATE_DATA: {
			let ret = Object.assign({}, state, action.data )
			ret['fetchingData'] = false
			return ret
		}

		default:
			return state
	}
}

export default stateData