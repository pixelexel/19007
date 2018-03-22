import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { TextField, Button, Divider } from 'material-ui'
import { sendMessage } from '../actions/chatbot'

const mapStateToProps = state => state.chatbot
const styles = theme => ({
    root: {
        position: 'fixed',
        top: 50,
        right: 15,
        backgroundColor: theme.palette.secondary.main,
    },

    paper: {
        overflow: 'auto',
        height: 200,
        width: 300,
        backgroundColor: theme.palette.secondary.main,
    }
})

class Chatbot extends Component{
    constructor(props){
        super(props)
        this.state = {
            'text': ''
        }
    }

    send = () => {
        const {text} = this.state
        this.props.dispatch(sendMessage(text))
        this.setState({
            'text': ''
        })
    }

    handleChange = (e) => {
        const value = e.target.value
        this.setState({
            'text': value,
        })
    }

    render(){
        const { classes, messages, fetching, open } = this.props
        console.log('chatbot', this.props)
        const display = open ? 'block' : 'none'

        return(
        <div className={classes.root}>
            <div style={{display: display}} >
                <iframe
                    width="350"
                    height="430"
                    src="https://console.dialogflow.com/api-client/demo/embedded/060505dd-8b3b-4a05-a5a2-f1119898c22e">
                </iframe>
            </div>
        </div> )
    }
}

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