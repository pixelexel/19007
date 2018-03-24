import { REQUEST_COUNTRY_DATA, RECEIVE_COUNTRY_DATA } from '../actions/country'

const initialState = {
	pp_data : [],
	no_ss : [],
	ex_curr : [],
	sports_data : [],
	acad_list : [],
	sports_list : [],
	fetchingData: false
}

function ind(getData){
	const pp_Pass = []
	const noss_Pass = []
	const curr_Pass = []
	const sports_Pass = []
	const acadl_Pass = []
	const sportsl_Pass = []
		
	const pp_Get = getData['pp_data']
	const noss_Get = getData['no_ss']
	const curr_Get = getData['ex_curr']
	const sports_Get = getData['sports_data']
	const acadl_Get = getData['acad_list']
	const sportsl_Get = getData['sports_list']
	
	
	for(let i=0; i<pp_Get.length; i++)
	{
		const k =  Object.keys(pp_Get[i])[0];
		pp_Pass.push({'State': k, 'uv': pp_Get[i][k] });
	}

	
	for(let i=0; i<noss_Get.length; i++)
	{
		const k =  Object.keys(noss_Get[i])[0];
		noss_Pass.push({'State': k, 'uv': noss_Get[i][k] });
	}

	
	for(let i=0; i<curr_Get.length; i++)
	{
		const k =  Object.keys(curr_Get[i])[0];
		curr_Pass.push({'State': k, 'uv': curr_Get[i][k] });
	}

	
	for(let i=0; i<sports_Get.length; i++)
	{
		const k =  Object.keys(sports_Get[i])[0];
		sports_Pass.push({'State': k, 'uv': sports_Get[i][k] });
	}

	
	for(let i=0; i<acadl_Get.length; i++)
	{
		const k =  Object.keys(acadl_Get[i])[0];
		acadl_Pass.push({'State': k, 'uv': acadl_Get[i][k] });
	}
	for(let i=0; i<sportsl_Get.length; i++)
	{
		const k =  Object.keys(sportsl_Get[i])[0];
		sportsl_Pass.push({'State': k, 'uv': sportsl_Get[i][k] });
	}

	const allDataPass = {
		'pp_data': pp_Pass,
		'no_ss' : noss_Pass,
		'ex_curr' : curr_Pass,
		'sports_data' : sports_Pass,
		'acad_list' : acadl_Pass,
		'sports_list' : sportsl_Pass,
	}
	console.log('Country Data',allDataPass);
	return allDataPass; 
}

const countryData = (state = initialState, action) => {
	let { data, type } = action.data || {}
	
	switch(action.type){
		case REQUEST_COUNTRY_DATA:
			return Object.assign({}, state, {
				fetchingData: true
			})

		case RECEIVE_COUNTRY_DATA: {
			console.log('country data recieved',action.data)
			let ret = Object.assign({}, state, action.data )
			ret['fetchingData'] = false
			return ret
		}

		default:
			return state
	}
}

export default countryData