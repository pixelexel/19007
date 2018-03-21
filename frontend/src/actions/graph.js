import { BASE_API_URL } from '../config'
import { exampleGraph, sampleGraphs } from '../samples'

export const ADD_GRAPH = 'ADD_GRAPH'
export const REQUEST_ALL_GRAPHS = 'REQUEST_ALL_GRAPHS'
export const RECEIVE_ALL_GRAPHS = 'RECEIVE_ALL_GRAPHS'
export const REMOVE_GRAPH = 'REMOVE_GRAPH'

const addGraphToState =  data => ({
	type: ADD_GRAPH,
	data: data,
})

const removeGraphFromState = data => ({
	type: REMOVE_GRAPH,
	data: data,
})

const requestAllGraphs = () => ({
	type: REQUEST_ALL_GRAPHS
})

const receiveAllGraphs = (error, data) => ({
	type: RECEIVE_ALL_GRAPHS, 
	data: data,
	error: error,
})

export const addGraph = graphData => {
	return (dispatch) => {
		console.log('sending ', graphData)
		return fetch(BASE_API_URL + 'send_graph', {
					method: 'post',
					body: JSON.stringify(graphData)
				})
				.then(data => data.json())
				.then(json => dispatch(addGraphToState(json)))
				.catch(err => dispatch(addGraphToState(Object.assign({}, graphData, {
					id: graphData.id,
					data: exampleGraph(graphData),
				}))))
	}
}

export const removeGraph = graphData => {
	return (dispatch) => {
		return fetch(BASE_API_URL + 'delete_graph/', {
			method: 'post',
			body: JSON.stringify(graphData)
		})
		.then(data => data.json())
		.then(json => dispatch(removeGraphFromState(graphData)))
		.catch(err => dispatch(removeGraphFromState(graphData)))
	}
}

export const getAllGraphs = () => {
	return (dispatch) => {
		dispatch(requestAllGraphs())
		return fetch(BASE_API_URL + 'get_all_graphs')
				.then(data => data.json())
				.then(json => dispatch(receiveAllGraphs(json.error, json.graphs)))
				.catch(err => dispatch(receiveAllGraphs(false, sampleGraphs().graphs)))

	}
}