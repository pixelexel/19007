import { RECEIVE_LIST_FROM_FILTERS, ADD_TO_TABLE, UPDATE_TABLE, 
        DELETE_FROM_TABLE, START_SAVING_FILTER } from '../actions/addfilter'

const initialState = {
    data: [],
    filter_meta: {
        ftype: 'int',
        fname: '',
        fdefault: 0,
        fset: false,
    },
    saving: false,
}

const addfilter = (state = initialState, action) => {
    switch(action.type){
        case RECEIVE_LIST_FROM_FILTERS:
            return Object.assign({}, state, {
                data: action.data.map(d=> ({
                    name: d.name,
                    aadhar_id: d.aadhar_id,
                    district: d.unpack.district,
                    school: d.unpack.school,
                    state: d.unpack.state,
                    value: null,
                }))
            })
        
        case UPDATE_TABLE:
            return Object.assign({}, state, {
                data: action.data
            })
        
        case START_SAVING_FILTER:
            return Object.assign({}, initialState, {
                saving: true,
            })

        case DELETE_FROM_TABLE: {
            let ids = {}
            for(let i in action.data){
                ids[action.data[i]] = true
            }
            const newData = state.data.filter(x => !ids[x.aadhar_id])
            return Object.assign({}, state, {
                data: newData
            })
        }

        case ADD_TO_TABLE:
            let newData = state.data.slice()
            let present = false

            for(let i in newData){
                if(newData[i].aadhar_id == action.data.aadhar_id){
                    present = true
                }
            }

            if(!present){
                let copy = action.data
                copy['value'] = null
                newData.unshift(copy)
            }

            return Object.assign({}, state, {
                data: newData
            })
            
        default:
            return state
    }
}

export default addfilter