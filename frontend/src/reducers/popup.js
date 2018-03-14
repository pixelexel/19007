import { OPEN_POPUP, CLOSE_POPUP } from '../actions/popup'

const initialState = {
	open: false,
	x: null,
	y: null,
	filters: [],
	screen: 'choose'
}

const popup = (state = initialState, action) => {
	let defaults = action.defaults
	switch(action.type){
		case OPEN_POPUP:
			return Object.assign({}, state, {
				open: true,
				x: defaults.x,
				y: defaults.y,
				screen: defaults.screen ? defaults.screen: initialState.screen,
				filters: defaults.filters ? defaults.filters : initialState.filters,
			})

		case CLOSE_POPUP:
			return Object.assign({}, state, {
				open: false,
			})

		default:
			return state
	}
}

export default popup