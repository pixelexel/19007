import { ADD_LIST } from '../actions/list'

const initialState = {
	lists: [],
	listId: 0,
}

const list = (state = initialState, action) => {
	let { x, filters, name } = action.data || {}
	switch(action.type){
		case ADD_LIST:
			let lists = state.lists.slice()
			lists.push({
				x: x,
				name: name,
				filters: filters,
				id: state.listId + 1
			})

			return Object.assign({}, state, {
				lists: lists,
				listId: state.listId + 1,
			})

		default:
			return state
	}
}

export default list