import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TrendingUpIcon from 'material-ui-icons/TrendingUp'
import ChatBubbleIcon from 'material-ui-icons/ChatBubble'
import MenuIcon from 'material-ui-icons/Menu'
import Avatar from 'material-ui/Avatar'
import { IconButton } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import Search_bar from '../components/Search_bar'

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	primaryAvatar: {
		color: theme.palette.secondary.dark,
		backgroundColor: theme.palette.primary.main,
		marginRight: 30,
		height: 40,
		width: 40,
		cursor: 'pointer',
	},
	shiftRight: {
		marginLeft: 300,
	},
	flex: {
		flex: 1,
	},
	toolbar: {
		transition: 'margin .1s ease',
	}
})

class Header extends Component{
	render(){
		const { classes, theme } = this.props
		
		return(
		<AppBar className={classes.root} position="sticky" color="default">
	       <Toolbar className={classes.toolbar + (this.props.drawer.open ? ' ' + classes.shiftRight : '')}>
	       	  <IconButton
	              color="inherit"
	              aria-label="open drawer"
	              onClick={this.props.handleMenuClick}>
	            <MenuIcon />
	          </IconButton>

	       	  <Avatar onClick={e => { this.props.dispatch(this.props.changeScreen('DASH')) }} className={classes.primaryAvatar}>
	       	  	<TrendingUpIcon/>
	       	  </Avatar>
	          
	          <Typography className={classes.flex} variant="title" color="inherit">
	            Student Analytics
	          </Typography>
	          <div >
	          	<Search_bar />
	          </div>
			  <IconButton
				  aria-label="open-chatbot"
				  onClick={this.props.handleChatbot}
			  >
						<ChatBubbleIcon style={{color: theme.palette.secondary.light}}/>
				  </IconButton>
	        </Toolbar>
	      </AppBar>
		)
	}
}

export default withStyles(styles, {withTheme:true})(Header)