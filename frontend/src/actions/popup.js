export const OPEN_POPUP = 'OPEN_POPUP'
export const CLOSE_POPUP = 'CLOSE_POPUP'
export const SET_SCREEN = 'SET_SCREEN'

export const openPopup = context => {
	return {
		type: OPEN_POPUP,
		context: context,
	}
}

export const closePopup = () => {
	return {
		type: CLOSE_POPUP,
	}
}

export const setScreen = screen => {
	return {
		type: SET_SCREEN,
		screen: screen,
	}
}