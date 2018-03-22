import { CHANGE_SCREEN, screens, TOGGLE_DRAWER } from '../actions/root'

const initialState = {
	screen: screens.DASH,
	drawer: {
		open: false,
	},
	id: null,
}

const rootComp = (state = initialState, action) => {
	switch(action.type){
		case CHANGE_SCREEN:
			if(state.screen != action.screen)
				return Object.assign({}, state, {
					screen: action.screen,
					id: action.id,
				})
			else return state

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