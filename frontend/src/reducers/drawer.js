import { FETCH_DRAWER_DATA, RECEIVE_DRAWER_DATA} from '../actions/drawer'

const initialState = {
    fetching: false,
    dashboards: [],
    custom_filters: [],
}

const drawer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_DRAWER_DATA:
            return Object.assign({}, state, {
                fetching: true,
            })

        case RECEIVE_DRAWER_DATA:
            return Object.assign({}, state, {
                dashboards: action.data.dashboards,
                custom_filters: action.data.custom_filters,
                fetching: false,
            })

        default:
            return state
    }
}

export default drawer