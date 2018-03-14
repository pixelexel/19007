import { OPEN_POPUP, CLOSE_POPUP, SET_SCREEN } from '../actions/popup'
import { screens } from '../components/PopupContainer'

const initialState = {
	open: false,
	x: null,
	y: null,
	filters: [],
	screen: screens.CHOOSE
}

const popup = (state = initialState, action) => {
	let defaults = action.defaults
	switch(action.type){
		case OPEN_POPUP:
			return Object.assign({}, state, {
				open: true,
				x: defaults.x ? defaults.x : initialState.x,
				y: defaults.y ? defaults.y : initialState.y,
				screen: defaults.screen ? defaults.screen: initialState.screen,
				filters: defaults.filters ? defaults.filters : initialState.filters,
			})

		case CLOSE_POPUP:
			return Object.assign({}, state, {
				open: false,
			})

		case SET_SCREEN:
			return Object.assign({}, state, {
				screen: action.screen
			})

		default:
			return state
	}
}

export default popup