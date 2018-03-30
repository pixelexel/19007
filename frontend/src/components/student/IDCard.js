import React, {Component} from 'react'
import { Card, CardContent, Avatar, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import LocationOnIcon from 'material-ui-icons/LocationOn'

const styles = theme => ({
    avatar: {
        height: 60,
        width: 60,
        marginLeft:0,
        borderRadius:0,
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
        paddingBottom: 0,
        paddingTop: 11,
    }
})

class IDCard extends Component{
    render(){
        const { classes, name, school } = this.props
        return (<Card className={classes.card}>
            <CardContent>
                <Avatar
                    className={classes.avatar}
                    src=""
                />
                <Typography component='h1' className={classes.textCenter + ' ' + classes.name}>
                    {this.props.name}
                </Typography>
                <Typography component='p' className={classes.textCenter}>
                    {this.props.school}
                </Typography>
                <Typography component='p' className={classes.textCenter}>
                    {this.props.district}, {this.props.state}
                </Typography>
            </CardContent>
        </Card>)
    }
}

export default withStyles(styles)(IDCard)