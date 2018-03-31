import { FETCH_DRAWER_DATA, RECEIVE_DRAWER_DATA, ADD_DASHBOARD_TO_DRAWER } from '../actions/drawer'

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
        
        case ADD_DASHBOARD_TO_DRAWER:
            let newDashboards = state.dashboards.slice()
            let found = false
            for(let i in newDashboards){
                if(newDashboards[i].id == action.id){
                    found = true
                    break
                }
            }
            
            if(!found){
                newDashboards.push({
                    id: action.id,
                    name: action.name,
                })
            }

            return Object.assign({}, state, {
                dashboards: newDashboards,
            })

        default:
            return state
    }
}

export default drawer