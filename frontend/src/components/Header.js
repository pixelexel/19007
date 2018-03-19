import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TrendingUpIcon from 'material-ui-icons/TrendingUp'
import MenuIcon from 'material-ui-icons/Menu'
import Avatar from 'material-ui/Avatar'
import { IconButton } from 'material-ui'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
	primaryAvatar: {
		color: theme.palette.secondary.dark,
		backgroundColor: theme.palette.primary.main,
		marginRight: 30,
		height: 40,
		width: 40
	},
})

class Header extends Component{
	render(){
		const { classes } = this.props
		return(
		<AppBar position="sticky" color="default">
	       <Toolbar>
	       	  <IconButton
	              color="inherit"
	              aria-label="open drawer"
	              onClick={this.props.handleMenuClick}>
	            <MenuIcon />
	          </IconButton>

	       	  <Avatar className={classes.primaryAvatar}>
	       	  	<TrendingUpIcon/>
	       	  </Avatar>
	          
	          <Typography variant="title" color="inherit">
	            Student Analytics
	          </Typography>
	        </Toolbar>
	      </AppBar>
		)
	}
}

export default withStyles(styles)(Header)