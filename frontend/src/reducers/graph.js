import { ADD_GRAPH } from '../actions/graph'

const initialState = {
	graphs: [],
	graphId: 0
}

const graph = (state = initialState, action) => {
	let { x, y, filters, name } = action.data || {}
	
	switch(action.type){
		case ADD_GRAPH:
			let graphs = state.graphs.slice()
			graphs.push({
				x: x,
				y: y,
				name: name,
				id: state.graphId + 1,
				filters: filters,
			})

			return Object.assign({}, state, {
				graphs: graphs,
				graphId: state.graphId + 1,
			})

		default:
			return state
	}
}

export default graph