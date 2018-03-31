import {getCountryData} from './country'
import {getStateData} from './state'
import {getDistrictData} from './district'
import {getSchoolData} from './school'

export const screens = {
	DASH: 'DASH',
	STUDENT: 'STUDENT',
	COUNTRY: 'COUNTRY',
	STATE: 'STATE',
	DISTRICT: 'DISTRICT',
	SCHOOL: 'SCHOOL',
	ADD_FILTER: 'ADDFILTER',
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

export const SET_ROOT_FILTER = 'SET_ROOT_FILTER'
const rootFilter = (start_date, end_date) => ({
	type: SET_ROOT_FILTER,
	start_date: start_date,
	end_date: end_date,
})

export const setRootFilter = (start_date, end_date, screen, id) => {
	return (dispatch, getState) => {
		
		if(isNaN(start_date) || isNaN(end_date) || (parseFloat(start_date) >= parseFloat(end_date)))
			return 

		dispatch(rootFilter(start_date, end_date))
		const state = getState()
		console.log('hey hey hye', screen, id)
		switch(screen.toUpperCase()){
			case screens.COUNTRY:
				dispatch(getCountryData({
					'filters': {
						'start_date': start_date,
						'end_date': end_date
					}
				}))
				break
			case screens.STATE:
				dispatch(getStateData(id, {
					'filters': {
						'start_date': start_date,
						'end_date': end_date
					}
				}))
				break
			case screens.DISTRICT:
				dispatch(getDistrictData(id, {
					'filters': {
						'start_date': start_date,
						'end_date': end_date
					}
				}))
				break
			case screens.SCHOOL:
				dispatch(getSchoolData(id, {
					'filters': {
						'start_date': start_date,
						'end_date': end_date
					}
				}))
				break
		}
	}
}