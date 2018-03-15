import { ADD_GRAPH } from '../actions/graph'

const initialState = {
	graphs: [],
	graphId: 0
}

const graph = (state = initialState, action) => {
	let { x, y, filters, name, id, data } = action.data || {}
	
	switch(action.type){
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
					graphs.push(newGraph)
				}
			}

			else{
				newGraph.id = state.graphId + 1
				graphs.push(newGraph)
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