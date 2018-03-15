import { BASE_API_URL } from '../config'
import { sampleLists } from '../samples'

export const ADD_LIST = 'ADD_LIST'
export const REQUEST_ALL_LISTS = 'REQUEST_ALL_LISTS'
export const RECEIVE_ALL_LISTS = 'RECEIVE_ALL_LISTS'

const addListToState =  data => ({
	type: ADD_LIST,
	data: data,
})

const requestAllLists = () => ({
	type: REQUEST_ALL_LISTS
})

const receiveAllLists = (error, data) => ({
	type: RECEIVE_ALL_LISTS, 
	data: data,
	error: error,
})

export const addList = listData => {
	return (dispatch) => {
		return fetch(BASE_API_URL + '/send_list/', {
					method: 'post',
					body: JSON.stringify(listData)
				})
				.then(data => data.json())
				.then(json => dispatch(addListToState(json)))
				.catch(error => dispatch(addListToState(Object.assign({}, listData, {
					id: Math.ceil(Math.random()*1000),
					data: [],
				}))))
	}
}

export const getAllLists = () => {
	return (dispatch) => {
		dispatch(requestAllLists())
		return fetch(BASE_API_URL + 'get_all_lists/')
				.then(data => data.json())
				.then(json => dispatch(receiveAllLists(json.error, json.lists)))
				.catch(err => dispatch(receiveAllLists(false, sampleLists().lists)))

	}
}