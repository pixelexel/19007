import { BASE_API_URL } from '../config'

export const RECEIVE_SUGGESTIONS = 'RECIEVE_SUGGESTIONS'

const recieveSuggestions = (error, data, target) => {
  let newData = Object.assign({}, data)
  newData['target'] = target
  return {
    type: RECEIVE_SUGGESTIONS,
    data: newData,
    error: error,
  }
}

export const getSuggestion = (typed_data, target) => {    
 return (dispatch) => {
      return fetch(BASE_API_URL + 'get_suggestions',{
					method: 'post',
					body: JSON.stringify(typed_data)
				})
        .then(data => data.json())
        .then(json => dispatch(recieveSuggestions(json.error, json, target)))
        .catch(err => dispatch(recieveSuggestions(false,{'student':['heloo']}, target)))
  }
}