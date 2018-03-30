import { BASE_API_URL } from '../config'

export const FETCH_DRAWER_DATA = 'FETCH_DRAWER_DATA'
export const RECEIVE_DRAWER_DATA = 'RECEIVE_DRAWER_DATA'

const receiveDrawerData = (data) => ({
    type: RECEIVE_DRAWER_DATA,
    data: data,
})

const fetchDrawerData = () => ({
    type: FETCH_DRAWER_DATA,
})

export const getDrawerData = () => {
    return dispatch => {
        dispatch(fetchDrawerData())
        return fetch(BASE_API_URL + 'get_drawer_data')
            .then(data => data.json())
            .then(json => dispatch(receiveDrawerData(json)))
    }
}