import { BASE_API_URL } from '../config'
export const ADD_LIST = 'ADD_LIST'

const addListToState =  data => ({
	type: ADD_LIST,
	data: data,
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