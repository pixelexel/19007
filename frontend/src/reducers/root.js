import { CHANGE_SCREEN, screens, TOGGLE_DRAWER } from '../actions/root'

const initialState = {
	screen: screens.COUNTRY,
	drawer: {
		open: false,
	},
	id: null,
}

const rootComp = (state = initialState, action) => {
	switch(action.type){
		case CHANGE_SCREEN:
				return Object.assign({}, state, {
					screen: action.screen,
					id: action.id,
					drawer: {
						open: false,
					}
				})

		case TOGGLE_DRAWER:
			return Object.assign({}, state, {
				drawer: Object.assign({}, state.drawer, {
					open: !state.drawer.open,
				})
			})

		default:
			return state
	}
}

export default rootComp