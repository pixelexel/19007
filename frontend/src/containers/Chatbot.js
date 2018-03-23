import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { TextField, Button, Divider } from 'material-ui'
import { sendMessage } from '../actions/chatbot'
import  ChatbotMessage  from '../components/ChatbotMessage'

const mapStateToProps = state => state.chatbot
const styles = theme => ({
    root: {
        position: 'fixed',
        top: 65,
        right: 15,
        backgroundColor: theme.palette.secondary.main,
        boxShadow: theme.shadows[5],
    },

    paper: {
        overflow: 'auto',
        height: 430,
        width: 350,
        backgroundColor: theme.palette.secondary.main,
    },

    textfield :{
        background: 'none',
        verticalAlign: 'middle',
        display: 'block',
        font: 'inherit',
        width: 'calc(100% - 20px)',
        border: 0,
        margin: 0,
        marginLeft: 10,
        marginRight: 10,
        color: '#fff',
        boxSizing: 'content-box',
        paddingTop: 10,
        paddingBottom: 10,
        outline: 'none',
        overflow: 'hidden',
    }
})

class Chatbot extends Component{
    constructor(props){
        super(props)
        this.state = {
            'text': ''
        }
    }

    send = (e) => {
        if(e.key == 'Enter'){
            const {text} = this.state
            this.props.dispatch(sendMessage(text))
            this.setState({
                'text': ''
            })
        }
    }

    handleChange = (e) => {
        const value = e.target.value
        this.setState({
            'text': value,
        })
    }

    componentDidUpdate(prevProps, prevState){
        
        if(prevProps != this.props){
            const element = document.getElementById("chatwindow")
            element.scrollTop = element.scrollHeight
        }
    }

    getMessage = (message, index) => {
        let rend = null
        if (message.type == 'received') {
            if (message.action == 'get_filters') {
                rend = (
                    <div key={index} style={{ textAlign: 'right', width: '100%' }}>
                        <ChatbotMessage
                            type={message.type}
                            contentType='text'
                            content={message.value} />
                        <ChatbotMessage
                            type={message.type}
                            contentType='list'
                            content={message.data} />
                    </div>
                )
            }
            else {
                rend = (<div key={index} style={{ textAlign: 'right', width: '100%' }}>
                    <ChatbotMessage
                        type={message.type}
                        contentType='text'
                        content={message.value} />
                </div>)
            }
        }
        else {
            rend = (<div key={index}>
                <ChatbotMessage
                    type={message.type}
                    contentType='text'
                    content={message.value} />
            </div>)
        }

        return rend
    }

    render(){
        const { classes, messages, fetching, open } = this.props
        const display = open ? 'block' : 'none'

        return(
        <div className={classes.root}>
            <div style={{display: display}} >
                <div className={classes.paper} id="chatwindow">
                    { messages.map((message, index) => this.getMessage(message,index)) }
                </div>
                <Divider/>
                <input
                    className={classes.textfield} 
                    placeholder='Ask something'
                    onChange={this.handleChange} 
                    onKeyPress={this.send} 
                    value={this.state.text} />
                
            </div>
        </div> )
    }
}
/*
<Button onClick={this.send} disabled={fetching}>Send</Button>
*/

/*
{ messages.map((message, index) => (
                    <p key={index} style={{color: message.type == 'sent' ? 'yellow': 'blue'}}> {message.value} </p>
                ))}
*/
/*
    < iframe
    width = "350"
    height = "430"
    src = "https://console.dialogflow.com/api-client/demo/embedded/060505dd-8b3b-4a05-a5a2-f1119898c22e" >
        <
        /iframe>
*/

/*
<div className={classes.paper}>
                { messages.map((message, index) => (
                    <p key={index} style={{color: message.type == 'sent' ? 'yellow': 'blue'}}> {message.value} </p>
                ))}
            </div>
            <Divider/>
            <TextField onChange={this.handleChange} value={this.state.text} />
            <Button onClick={this.send} disabled={fetching}>Send</Button>
*/

export default withStyles(styles)(connect(mapStateToProps)(Chatbot))