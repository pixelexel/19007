import { ADD_LIST, REQUEST_ALL_LISTS, RECEIVE_ALL_LISTS, REMOVE_LIST } from '../actions/list'

const initialState = {
	lists: [],
	listId: 0,
}

const list = (state = initialState, action) => {
	let { x, filters, name, id, data } = action.data || {}

	switch(action.type){
		case REQUEST_ALL_LISTS:
			return Object.assign({}, state, {
				fetchingAllLists: true
			})

		case RECEIVE_ALL_LISTS:
			return Object.assign({}, state, {
				fetchingAllLists: false,
				lists: action.data,
			})
		
		case REMOVE_LIST: {
			let id = action.data
			let { lists } = state
			let newLists = []

			for(let i = 0 ; i < lists.length; i++){
				if(lists[i].id != id){
					newLists.push(lists[i])
				}
			}

			return Object.assign({}, state, {
				lists: newLists,
			})
		}

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
				lists.unshift(newList)
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