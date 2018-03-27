import { REQUEST_DISTRICT_DATA, RECEIVE_DISTRICT_DATA } from '../actions/district'

const initialState = {
	pp_data : [],
	ss_no : [],
	ex_curr : [],
	sport_d : [],
	top_marks : [],
	top_sport : [],
	top_extra_curr : [],
	fetchingData: false
}

function ind(getData){
	const pp_Pass = []
	const noss_Pass = []
	const curr_Pass = []
	const sports_Pass = []
	
	const sportsl_Pass = []
	const currl_Pass = []
		
	const pp_Get = getData['pp_data']
	const noss_Get = getData['ss_no']
	const curr_Get = getData['ex_curr']
	const sports_Get = getData['sport_d']
	const acadl_Get = getData['top_marks']
	const sportsl_Get = getData['top_sport']
	const currl_Get = getData['top_extra_curr']
	console.log('check state data', pp_Get );
	
	const pp_keys = Object.keys(pp_Get);
	const ssno_keys = Object.keys(noss_Get);
	const curr_keys = Object.keys(curr_Get);
	const sport_keys = Object.keys(sports_Get);

	for(let i=0; i<pp_keys.length; i++)
	{
		pp_Pass.push({'name': pp_keys[i], 'value': Math.round(pp_Get[pp_keys[i]])} );
	}
	
	for(let i=0; i<ssno_keys.length; i++)
	{
		noss_Pass.push({'name': ssno_keys[i], 'value': noss_Get[ssno_keys[i]]} );
	}

	
	for(let i=0; i<curr_keys.length; i++)
	{
		curr_Pass.push({'name': curr_keys[i], 'value':curr_Get[curr_keys[i]]} );	
	}

	
	for(let i=0; i<sport_keys.length; i++)
	{
		sports_Pass.push({'name': sport_keys[i], 'value':sports_Get[sport_keys[i]]} );
	}

	const allDataPass = {
		'pp_data': pp_Pass,
		'ss_no' : noss_Pass,
		'ex_curr' : curr_Pass,
		'sport_d' : sports_Pass,
		'top_marks' : acadl_Get,
		'top_sport' : sportsl_Get,
		'top_extra_curr' : currl_Get,
	}
	console.log('State Data Passed',allDataPass);
	return allDataPass; 
}

const districtData = (state = initialState, action) => {
	let { data, type } = action.data || {}
	
	switch(action.type){
		case REQUEST_DISTRICT_DATA:
			return Object.assign({}, state, {
				fetchingData: true
			})

		case RECEIVE_DISTRICT_DATA: {
			let ret = Object.assign({}, state, ind(action.data) )
			ret['fetchingData'] = false
			return ret
		}

		default:
			return state
	}
}

export default districtData