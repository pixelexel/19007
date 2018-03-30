import React, { Component } from 'react'
import { Typography, List, ListItem, ListItemText, Paper} from 'material-ui'
import ListComponent from './ListComponent'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
    paper: { 
        maxWidth: '80%', 
        marginTop: 8, 
        marginBottom: 8, 
        marginRight: 10, 
        marginLeft: 10, 
        padding: 6, 
        display: 'inline-block' 
    },

    list: {
        maxHeight: 200,
        overflow: 'auto',
    }
})

class ChatbotMessage extends Component{
    render(){
        const { width, content, type, contentType, classes, theme } = this.props
        let rend = null
        const backgroundColor = type == 'received' ? theme.palette.background.paper : theme.palette.primary.main
        const color = type == 'received' ? '#ffffff' : '#000'
        
        if (content == null || (content.length && content.length == 0)) return null

        if (contentType == 'text')
            rend = (<Typography 
                        component="p" 
                        style={{textAlign: 'left', color: color}}> 
                        {content} 
                    </Typography>)

        else if (contentType == 'list'){
            console.log('chatbot', content)
           rend = (
               <ListComponent style={{maxHeight: 200}} data={content}/>
           )
        }
        
        return (<Paper className={classes.paper} style={{backgroundColor: backgroundColor}}>
            {rend}
        </Paper>)
    }
}

export default withStyles(styles, {withTheme: true})(ChatbotMessage)

/*
 rend = (<List className={classes.list}>
                {content.map((c, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={c.name}/>
                        <ListItemText primary={c.value} style={{textAlign: 'right'}}/>
                    </ListItem>
                ))}
            </List>)

*/