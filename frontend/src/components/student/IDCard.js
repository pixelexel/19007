import React, {Component} from 'react'
import { Card, CardContent, Avatar, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
    avatar: {
        height: 120,
        width: 120,
        margin: 'auto'
    },
    name: {
        textAlign: 'center',
        fontSize: '1.25rem',
        fontWeight: 700,
        marginTop: 15,
    },
    textCenter: {
        textAlign: 'center',
        color: '#898C92',
    },
    card: {
        padding: 15,
    }
})

class IDCard extends Component{
    render(){
        const { classes, name, school } = this.props
        return (<Card className={classes.card}>
            <CardContent>
                <Avatar
                    className={classes.avatar}
                    src="http://vfsglobal.herokuapp.com/static/media/doc3.svg"
                />
                <Typography component='h1' className={classes.textCenter + ' ' + classes.name}>
                    {this.props.name}
                </Typography>
                <Typography component='p' className={classes.textCenter}>
                    {this.props.school}
                </Typography>
            </CardContent>
        </Card>)
    }
}

export default withStyles(styles)(IDCard)