import { OPEN_POPUP, CLOSE_POPUP, SET_SCREEN } from '../actions/popup'
import { screens } from '../components/PopupContainer'

const initialState = {
	open: false,
	screen: screens.CHOOSE,
	graph: {
		id: null,
		x: null,
		y: null,
		filters: [],
		name: 'Untitled Graph'
	},
	list: {
		id: null,
		x: null,
		filters: [],
		name: 'Untitled List'
	},
}

const popup = (state = initialState, action) => {	
	let { screen, graph, list } = action.defaults || initialState

	switch(action.type){
		case OPEN_POPUP:
			return Object.assign({}, state, {
				open: true,
				screen: screen,
				graph: graph,
				list: list,
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