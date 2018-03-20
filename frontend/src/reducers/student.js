import { REQUEST_STUDENT_DATA, RECEIVE_STUDENT_DATA } from '../actions/student'

const initialState = {
	data: [],
	acad_data: [],
	sport_data: [],
	c_data: [],
	d_data: [],
	fetchingData: false
}
// 'alldata' consists of data, acad_data, sport_data, c_data, d_data, rank_data 
// refer components/student/GridSet.js 

const studentData = (state = initialState, action) => {
	let { data, type } = action.data || {}
	
	switch(action.type){
		case REQUEST_STUDENT_DATA:
			return Object.assign({}, state, {
				fetchingData: true
			})

		case RECEIVE_STUDENT_DATA: {
			let ret = Object.assign({}, state, action.data )
			ret['fetchingData'] = false
			return ret
		}

		default:
			return state
	}
}

export default studentData