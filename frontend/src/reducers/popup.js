import { OPEN_POPUP, CLOSE_POPUP, SET_SCREEN, UPDATE_GRAPH_FORM, UPDATE_LIST_FORM,
		 REQUEST_FORM_VALS, RECEIVE_FORM_VALS } from '../actions/popup'
import { screens } from '../components/PopupContainer'

const initialState = {
	open: false,
	isFetching: false,
	formValsFetched: false,
	screen: screens.CHOOSE,
	graph: {
		id: null,
		x: '',
		y: '',
		filters: [],
		name: '',
		formVals: {},
	},
	list: {
		id: null,
		x: '',
		filters: [],
		name: '',
		formVals: {},
	},
}

const popup = (state = initialState, action) => {	
	switch(action.type){
		case OPEN_POPUP:
			let screen = action.context.screen ? action.context.screen : initialState.screen,
				graph = action.context.graph ? Object.assign({}, state.graph, action.context.graph) : initialState.graph,
				list = action.context.list ? Object.assign({}, state.list, action.context.list) : initialState.list;

			return Object.assign({}, state, {
				open: true,
				screen: screen,
				graph: graph,
				list: list,
			})

		case CLOSE_POPUP:
			return Object.assign({}, state, {
				open: false,
				formValsFetched: false
			})

		case SET_SCREEN:
			return Object.assign({}, state, {
				screen: action.screen
			})

		case UPDATE_GRAPH_FORM:
			let { id, x, y, name, filters } = action.data
			graph = Object.assign({}, state.graph, {
					id: id,
					x: x,
					y: y,
					name: name,
					filters: filters, 
				})

			return Object.assign({}, state, {
				graph: graph
			})

		case UPDATE_LIST_FORM:
			return state
			
		case REQUEST_FORM_VALS:
			return Object.assign({}, state, {
				isFetching: true
			})

		case RECEIVE_FORM_VALS:
			console.log(RECEIVE_FORM_VALS, action, state)
			if(action.error) return state

			graph = Object.assign({}, state.graph, {
				formVals: action.data.graph,
			})

			list = Object.assign({}, state.list, {
				formVals: action.data.list,
			})

			return Object.assign({}, state, {
				isFetching: false,
				graph: graph,
				list: list,
				formValsFetched: true,
			})

		default:
			return state
	}
}

export default popup