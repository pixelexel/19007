export const screens = {
	DASH: 'DASH',
	STUDENT: 'STUDENT',
	COUNTRY: 'COUNTRY',
	STATE: 'STATE',
	DISTRICT: 'DISTRICT',
	SCHOOL: 'SCHOOL',
	ADD_FILTER: 'ADD FILTER',
}

export const CHANGE_SCREEN = 'CHANGE_SCREEN'

export const changeScreen = (screen, id, args = null) => ({
	type: CHANGE_SCREEN,
	screen: screen, 
	id: id,
	args: args,
})

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export const toggleDrawer = () => ({
	type: TOGGLE_DRAWER,
})

export const UPDATE_DASH_NAME = 'UPDATE_DASH_NAME'
const receiveDashName = (dash_id, dash_name) => ({
	type: UPDATE_DASH_NAME,
	id: dash_id,
	dash_name: dash_name,
})

export const updateDashName = (dash_id, dash_name) => {
	return dispatch => {
		return fetch('update_dash_name/' + dash_id + '/' + dash_name)
			.then(data => dispatch(receiveDashName(dash_id, dash_name)))
			.catch(error => dispatch(receiveDashName(dash_id, dash_name)))
	}
}