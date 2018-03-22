import { BASE_API_URL } from '../config'

export const RECEIVE_SUGGESTIONS = 'RECIEVE_SUGGESTIONS'

const recieveSuggestions = (error, data) => ({
  type: RECEIVE_SUGGESTIONS,
  data: data,
  error: error,
})

export const getSuggestion = (typed_data) => {
 return (dispatch) => {
      return fetch(BASE_API_URL + 'get_suggestions',{
					method: 'post',
					body: JSON.stringify(typed_data)
				})
        .then(data => data.json())
        .then(json => dispatch(recieveSuggestions(json.error, json)))
        .catch(err => dispatch(recieveSuggestions(false,{'student':['heloo']})))
  }
}