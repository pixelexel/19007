export const OPEN_POPUP = 'OPEN_POPUP'
export const CLOSE_POPUP = 'CLOSE_POPUP'

export const openPopup = defaults => {
	return {
		type: OPEN_POPUP,
		defaults: defaults,
	}
}

export const closePopup = () => {
	return {
		type: CLOSE_POPUP
	}
}