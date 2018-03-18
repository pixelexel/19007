import { CHANGE_SCREEN, screens } from '../actions/root'

const initialState = {
	screen: screens.DASH,
}

const rootComp = (state = initialState, action) => {
	switch(action.type){
		case CHANGE_SCREEN:
			if(state.screen != action.screen)
				return Object.assign({}, state, {
					screen: action.screen
				})
			else return state
		default:
			return state
	}
}

export default rootComp