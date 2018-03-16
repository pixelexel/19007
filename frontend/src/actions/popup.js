import { formVals } from '../samples'
import { BASE_API_URL } from '../config'
export const OPEN_POPUP = 'OPEN_POPUP'
export const CLOSE_POPUP = 'CLOSE_POPUP'
export const SET_SCREEN = 'SET_SCREEN'
export const UPDATE_GRAPH_FORM = 'UPDATE_GRAPH_FORM'
export const UPDATE_LIST_FORM = 'UPDATE_LIST_FORM'
export const REQUEST_FORM_VALS = 'REQUEST_FORM_VALS'
export const RECEIVE_FORM_VALS = 'RECEIVE_FORM_VALS'

export const openPopup = context => {
	return {
		type: OPEN_POPUP,
		context: context,
	}
}

export const closePopup = () => {
	return {
		type: CLOSE_POPUP,
	}
}

export const setScreen = screen => {
	return {
		type: SET_SCREEN,
		screen: screen,
	}
}

export const updateGraphForm = data => {
	return {
		type: UPDATE_GRAPH_FORM,
		data: data,
	}
}

export const updateListForm = data => {
	return {
		type: UPDATE_LIST_FORM,
		data: data,
	}
}

const requestFormVals = () => {
	return {
		type: REQUEST_FORM_VALS,
	}
}

const receiveFormVals = data => {
	return {
		type: RECEIVE_FORM_VALS,
		error: data.error,
		data: data
	}
}

export const getFormVals = () => {
	return dispatch => {
		dispatch(requestFormVals())
		return fetch(BASE_API_URL + 'get_form_vals', {mode: 'no-cors'})
				.then(data => data.json())
				.then(json => dispatch(receiveFormVals(json)))
				.catch(error=> {
					console.error('api call', error)
					dispatch(receiveFormVals(formVals))})
	}
}