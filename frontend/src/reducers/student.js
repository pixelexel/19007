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

function asd(allData) {
	const dataPass = []
	const acad_dataPass = []
	const sport_dataPass = []
	const c_dataPass = []
	const d_dataPass = []
	
	const max = 100;
	
	const dataGet = allData['data']
	const acad_dataGet = allData['acad_data']
	const sport_dataGet = allData['sport_data']
	const c_dataGet = allData['c_data']
	const d_dataGet = allData['d_data']
	const { details } = allData
 	
	// filling up data, i.e. subject wise data
	for(let i=0; i<dataGet.length; i++)
	{
		const k =  Object.keys(dataGet[i])[0];
		dataPass.push({'subject': k, 'A': dataGet[i][k], 'fullMark': max});
	}

	// filling up acad_data
	for(let i=0; i<acad_dataGet.length; i++)
	{
		const k =  Object.keys(acad_dataGet[i])[0];
		acad_dataPass.push({'name': k, 'uv': acad_dataGet[i][k] });
	}

	// filling up sport_data
	for(let i=0; i<sport_dataGet.length; i++)
	{
		const k =  Object.keys(sport_dataGet[i])[0];
		sport_dataPass.push({'name': k, 'uv': sport_dataGet[i][k] });
	}

	// filling up c_data
	for(let i=0; i<c_dataGet.length; i++)
	{
		const k =  Object.keys(c_dataGet[i])[0];
		c_dataPass.push({'name': k, 'uv': c_dataGet[i][k] });
	}

	// filling up d_data
	for(let i=0; i<d_dataGet.length; i++)
	{
		const k =  Object.keys(d_dataGet[i])[0];
		d_dataPass.push({'name': k, 'uv': d_dataGet[i][k] });
	}

	const allDataPass = {
		'data': dataPass,
		'acad_data': acad_dataPass,
		'sport_data': sport_dataPass,
		'c_data': c_dataPass,
		'd_data': d_dataPass,
		'details': details
	}
	return allDataPass;
}

const studentData = (state = initialState, action) => {
	let { data, type } = action.data || {}
	
	switch(action.type){
		case REQUEST_STUDENT_DATA:
			return Object.assign({}, state, {
				fetchingData: true
			})

		case RECEIVE_STUDENT_DATA: {
			console.log('gaurav',action.data)
			let ret = Object.assign({}, state, asd(action.data) )
			ret['fetchingData'] = false
			return ret
		}

		default:
			return state
	}
}

export default studentData