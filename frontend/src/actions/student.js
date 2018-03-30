import { BASE_API_URL } from '../config'
import { studentData } from '../samples'

export const REQUEST_STUDENT_DATA = 'REQUEST_STUDENT_DATA'
export const RECEIVE_STUDENT_DATA = 'RECEIVE_STUDENT_DATA'

const requestStudentData = () => ({
	type: REQUEST_STUDENT_DATA,
})

const receiveStudentData = (error, data) => ({
	type: RECEIVE_STUDENT_DATA, 
	data: data,
	error: error,
})

export const getStudentData = (id) => {
	return (dispatch) => {
		dispatch(requestStudentData())
		return fetch(BASE_API_URL + 'get_student_data/' + id,{
			credentials:"same-origin"
		})
				.then(data => data.json())
				.then(json => dispatch(receiveStudentData(json.error, json)))
				.catch(err => dispatch(receiveStudentData(false, studentData())))
	}
}