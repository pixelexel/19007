import { ADD_GRAPH, REQUEST_ALL_GRAPHS, RECEIVE_ALL_GRAPHS } from '../actions/graph'

const initialState = {
	fetchingAllGraphs: false,
	graphs: [],
	graphId: 0
}

const graph = (state = initialState, action) => {
	let { x, y, filters, name, id, data } = action.data || {}
	
	switch(action.type){
		case REQUEST_ALL_GRAPHS:
			return Object.assign({}, state, {
				fetchingAllGraphs: true
			})

		case RECEIVE_ALL_GRAPHS:
			return Object.assign({}, state, {
				fetchingAllGraphs: false,
				graphs: action.data,
			})
			
		case ADD_GRAPH:
			let newGraph = {
					x: x,
					y: y,
					name: name,
					id: id,
					filters: filters,
					data: data,
				}

			let graphs = state.graphs.slice()

			if(action.data.id){
				let found = false
				for(let i = 0 ; i < graphs.length; i ++){
					if(graphs[i].id == id){
						newGraph.id = action.data.id
						graphs[i] = newGraph
						found = true
					}
				}

				if(!found){
					graphs.unshift(newGraph)
				}
			}

			else{
				newGraph.id = state.graphId + 1
				graphs.unshift(newGraph)
			}

			return Object.assign({}, state, {
				graphs: graphs,
				graphId: action.data.id ? state.graphId : state.graphId + 1
			})

		default:
			return state
	}
}

export default graph