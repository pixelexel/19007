import { ADD_GRAPH, REQUEST_ALL_GRAPHS, RECEIVE_ALL_GRAPHS, REMOVE_GRAPH } from '../actions/graph'

const initialState = {
	fetchingAllGraphs: false,
	graphs: [],
	graphId: 0
}

const convertGraph = (action_data) => {
	const { data, data_nf, x, y, id, name, filters, type } = action_data
	let dataKeys = Object.keys(data)
	let datanfKeys = Object.keys(data_nf)
	let plot = []
	let done = {}

	for(let  i in dataKeys){
		let d = {}
		d[x] = dataKeys[i]
		d[y] = data[dataKeys[i]]
		d['filter'] = data_nf[dataKeys[i]] ? data_nf[dataKeys[i]] : null 
		done[dataKeys[i]] = true
		plot.push(d)
	}

	for(let i in datanfKeys){
		if(done[datanfKeys[i]]) continue

		let d = {}
		d[x] = datanfKeys[i]
		d[y] = null
		d['filter'] = data_nf[datanfKeys[i]]
		plot.push(d)
	}

	let newGraph = {
			x: x,
			y: y,
			name: name,
			id: id,
			filters: filters,
			data: plot,
			type: type ? type: 'LINE',
		}

	return newGraph
}

const graph = (state = initialState, action) => {
	let { x, y, filters, name, id, data, type, data_nf } = action.data || {}
	
	switch(action.type){
		case REQUEST_ALL_GRAPHS:
			return Object.assign({}, state, {
				fetchingAllGraphs: true
			})

		case RECEIVE_ALL_GRAPHS: {
			if(action.error){
				return Object.assign({}, state, {
					fetchingAllGraphs: false,
				})
			}
			else {
				const dataList = action.data.map(d => convertGraph(d))
				console.log('receivegraphs', dataList)
				return Object.assign({}, state, {
					fetchingAllGraphs: false,
					graphs: dataList,
				})
			}
		}

		case REMOVE_GRAPH: {
			let id = action.data
			let { graphs } = state
			let newGraphs = []

			for(let i = 0 ; i < graphs.length; i++){
				if(graphs[i].id != id){
					newGraphs.push(graphs[i])
				}
			}

			return Object.assign({}, state, {
				graphs: newGraphs
			})
		
		}
			
		case ADD_GRAPH:
			const newGraph = convertGraph(action.data)

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