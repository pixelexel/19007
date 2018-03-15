import { ADD_LIST } from '../actions/list'

const initialState = {
	lists: [],
	listId: 0,
}

const list = (state = initialState, action) => {
	let { x, filters, name, id, data } = action.data || {}

	switch(action.type){
		case ADD_LIST:
			let lists = state.lists.slice()
			let found = false
			let newList = {
				x: x,
				name: name,
				filters: filters,
				id: id,
				data: data,
			}

			for(let i = 0 ; i < lists.length; i ++){
				if(lists[i].id == id){
					lists[i] = newList
					found = true
					break
				}
			}

			if(!found){
				lists.push(newList)
			}

			return Object.assign({}, state, {
				lists: lists,
				listId: state.listId + 1,
			})

		default:
			return state
	}
}

export default list