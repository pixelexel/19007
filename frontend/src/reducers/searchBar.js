import { RECEIVE_SUGGESTIONS } from '../actions/searchbar'

const initialState = {
  state: [],
  district: [],
  school: [],
  student: [],
  target: '',
}

const searchBar = (state = initialState, action) => {
  switch(action.type){
    case RECEIVE_SUGGESTIONS :
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}
export default searchBar;