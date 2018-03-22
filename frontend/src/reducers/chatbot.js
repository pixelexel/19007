import { SEND_CHATBOT_MESSAGE, RECEIVE_CHATBOT_MESSAGE, TOGGLE_CHATBOT } from '../actions/chatbot'

const initialState = {
    messages: [],
    fetching: false,
    error: null,
    open: false,
}

const chatbot = (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_CHATBOT:
            return Object.assign({}, state, {
                open: !state.open
            })

        case SEND_CHATBOT_MESSAGE: {
            let newmessages = state.messages.slice()
            newmessages.push({
                    type: 'sent',
                    value: action.data,
                })

            return Object.assign({}, state, {
                fetching: true,
                messages: newmessages
            })
        }

        case RECEIVE_CHATBOT_MESSAGE: {
            console.log('receive chatbot response', action.data, state.messages)
            let newmessages = state.messages.slice()
            newmessages.push({
                type: 'received',
                value: action.data.fulfillment.speech,
            })
            return Object.assign({}, state, {
                fetching: false,
                messages: newmessages,
            })
        }

        default:
            return state
    }
}

export default chatbot