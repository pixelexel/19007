import { CHANGE_SCREEN, screens, TOGGLE_DRAWER, UPDATE_DASH_NAME, SET_ROOT_FILTER } from '../actions/root'

const initialState = {
	screen: screens.COUNTRY,
	drawer: {
		open: false,
	},
	id: null,
	name: '',
	filters: {},
}

const rootComp = (state = initialState, action) => {
	switch(action.type){
		case CHANGE_SCREEN:
				return Object.assign({}, state, {
					screen: action.screen,
					id: action.id,
					drawer: {
						open: false,
					},
					...action.args
				})

		case TOGGLE_DRAWER:
			return Object.assign({}, state, {
				drawer: Object.assign({}, state.drawer, {
					open: !state.drawer.open,
				})
			})

		case UPDATE_DASH_NAME:
			return Object.assign({}, state, {
				name: action.dash_name,
			})

		case SET_ROOT_FILTER:
			return Object.assign({}, state, {
				filters: {
					start_date: action.start_date,
					end_date: action.end_date,
				}
			})

		default:
			return state
	}
}

export default rootComp