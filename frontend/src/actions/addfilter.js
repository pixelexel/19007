import { BASE_API_URL } from '../config'
import { screens, changeScreen } from './root'
import { push } from 'react-router-redux'

export const RECEIVE_LIST_FROM_FILTERS = 'RECEIVE_LIST_FROM_FILTERS'
export const ADD_TO_TABLE = 'ADD_TO_TABLE'
export const UPDATE_TABLE = 'UPDATE_TABLE'
export const DELETE_FROM_TABLE = 'DELETE_FROM_TABLE'
export const START_SAVING_FILTER = 'START_SAVING_FILTER'
export const FINISH_SAVING_FILTER = 'FINISH_SAVING_FILTER'

const receiveListFromFilters = data => ({
    type: RECEIVE_LIST_FROM_FILTERS,
    data: data.data,
})

export const updateTable = data => ({
    type: UPDATE_TABLE,
    data: data,
})

export const addToTable = data => ({
    type: ADD_TO_TABLE,
    data: data,
})

export const deleteFromTable = data => ({
    type: DELETE_FROM_TABLE,
    data: data,
})

const startSavingFilter = () => ({
    type: START_SAVING_FILTER,
})

const finishSavingFilter = () => ({
    type: FINISH_SAVING_FILTER,
})

export const saveNewFilter = filter => {
    return dispatch => {
        dispatch(startSavingFilter())
        return fetch(BASE_API_URL + 'get_filter_data', {
            method: 'post',
            body: JSON.stringify(filter),
            credentials:"same-origin",
        }).then(data => data.json())
        .then(json => {
            dispatch(finishSavingFilter())
            // dispatch(changeScreen(screens.DASH))
            dispatch(push('/'))
        }
        )
    }
}

export const getListFromFilters = filters => {
    return dispatch => {
        console.log('getlist', filters)
        return fetch(BASE_API_URL + 'get_student_list', {
            method: 'post',
            body: JSON.stringify({'filters': filters}),
            credentials:"same-origin",
        }).then(data => data.json())
        .then(json => dispatch(receiveListFromFilters(json)))
    }
}