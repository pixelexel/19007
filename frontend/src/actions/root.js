export const screens = {
	DASH: 'DASH',
	STUDENT: 'STUDENT',
	COUNTRY: 'COUNTRY',
	STATE: 'STATE',
	DISTRICT: 'DISTRICT',
	SCHOOL: 'SCHOOL',
	
}

export const CHANGE_SCREEN = 'CHANGE_SCREEN'

export const changeScreen = (screen, id) => ({
	type: CHANGE_SCREEN,
	screen: screen, 
	id: id,
})

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export const toggleDrawer = () => ({
	type: TOGGLE_DRAWER,
})