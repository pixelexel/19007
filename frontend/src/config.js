import { createMuiTheme } from 'material-ui/styles'
import { pink, amber, grey } from 'material-ui/colors'

export const BASE_URL = 'http://localhost:8000/'
// export const BASE_URL = 'http://192.168.43.110:8000/'

export const BASE_API_URL = BASE_URL + 'api/'
export const IMAGE_URL = BASE_URL + 'static/images/'
export const PRIMARY_PALETTE_COLOR = '#212121'
export const SECONDARY_PALETTE_COLOR = '#BF360C'

export const AppTheme = createMuiTheme({
  palette: {
  	type:'dark',
    primary: amber,
    secondary: {
    	dark:'#000000',
    	light: '#484848',
    	main: '#212121',
    	contrastText: '#fff',
    },
    button:amber,
  },
});