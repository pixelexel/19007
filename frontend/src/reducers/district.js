import { REQUEST_DISTRICT_DATA, RECEIVE_DISTRICT_DATA } from '../actions/district'

const initialState = {
	pp_data : [],
	ss_no : [],
	ex_curr : [],
	sport_d : [],
	top_marks : [],
	top_sport : [],
	top_extra_curr : [],
	t_s_a : [],
	t_s_e : [],
	t_s_s : [],
	p_c : [],
	p_b : [],
	p_g : [],
	s_n : [],
	fetchingData: false
}

function ind(getData){
	const pp_Pass = []
	const noss_Pass = []
	const curr_Pass = []
	const sports_Pass = []
	const sportsl_Pass = []
	const currl_Pass = []
	const pc_Pass = []
	const pb_Pass = []
	const pg_Pass = []
	const tsa_Pass = []
	const tss_Pass = []
	const tse_Pass = []
		
	const pp_Get = getData['pp_data']
	const noss_Get = getData['ss_no']
	const curr_Get = getData['ex_curr']
	const sports_Get = getData['sport_d']
	const acadl_Get = getData['top_marks']
	const sportsl_Get = getData['top_sport']
	const currl_Get = getData['top_extra_curr']
	const tsa_Get = getData['t_s_a']
	const tss_Get = getData['t_s_s']
	const tse_Get = getData['t_s_e']
	const pc_Get = getData['p_c']
	const pb_Get = getData['p_b']
	const pg_Get = getData['p_g']
	const sn_Get = getData['s_n']
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
	pc_Pass.push({'name':sn_Get,'value':pc_Get});
	pb_Pass.push({'name':'Boys%','value':pb_Get});
	pg_Pass.push({'name':'Girls%','value':pg_Get});
	tsa_Pass.push({'name': tsa_Get.school,'value':tsa_Get.avg})
	tss_Pass.push({'name': tss_Get.school,'value':tss_Get.avg})
	tse_Pass.push({'name': tse_Get.school,'value':tse_Get.avg})
	const allDataPass = {
		'pp_data': pp_Pass,
		'ss_no' : noss_Pass,
		'ex_curr' : curr_Pass,
		'sport_d' : sports_Pass,
		'top_marks' : acadl_Get,
		'top_sport' : sportsl_Get,
		'top_extra_curr' : currl_Get,
		't_s_a': tsa_Pass,
		't_s_s': tss_Pass,
		't_s_e': tse_Pass,
		'p_c' : pc_Pass,
		'p_b' : pb_Pass,
		'p_g' : pg_Pass,
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