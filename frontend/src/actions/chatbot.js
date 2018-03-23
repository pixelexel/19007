import { ApiAiClient } from "api-ai-javascript"
export const RECEIVE_CHATBOT_MESSAGE = 'RECEIVE_CHATBOT_MESSAGE'
export const SEND_CHATBOT_MESSAGE = 'SEND_CHATBOT_MESSAGE'
export const TOGGLE_CHATBOT = 'TOGGLE_CHATBOT'

const receiveChatbotMessage = (error, data) => ({
    type: RECEIVE_CHATBOT_MESSAGE,
    data: data,
    error: error,
})

const sendChatbotMessage = (text) => ({
    type: SEND_CHATBOT_MESSAGE,
    data: text,
})

export const toggleChatbot = () => ({
    type: TOGGLE_CHATBOT,
})

export const sendMessage = (text) => {
    return (dispatch) => {
        dispatch(sendChatbotMessage(text))

        const client = new ApiAiClient({ accessToken: '3210fec9aa514c77a2f5d3b507312e59' })
            .textRequest(text)
            .then((response) => dispatch(
                    receiveChatbotMessage(
                        !(response.status.code == 200), 
                        response.result)))
            .catch((error) => dispatch(receiveChatbotMessage(error, null)))
    }
}