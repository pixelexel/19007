import { BASE_API_URL } from '../config'
import { exampleGraph } from '../samples'

export const ADD_GRAPH = 'ADD_GRAPH'

const addGraphToState =  data => ({
	type: ADD_GRAPH,
	data: data,
})

export const addGraph = graphData => {
	return (dispatch) => {
		return fetch(BASE_API_URL + '/send_graph/', {
					method: 'post',
					body: JSON.stringify(graphData)
				})
				.then(data => data.json())
				.then(json => dispatch(addGraphToState(json)))
				.catch(err => dispatch(addGraphToState(Object.assign({}, graphData, {
					id: Math.ceil(Math.random()*1000),
					data: exampleGraph(graphData),
				}))))
	}
}