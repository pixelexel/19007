import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TrendingUpIcon from 'material-ui-icons/TrendingUp'
import ChatBubbleIcon from 'material-ui-icons/ChatBubble'
import MenuIcon from 'material-ui-icons/Menu'
import Avatar from 'material-ui/Avatar'
import FilterListIcon from 'material-ui-icons/FilterList'
import DateFilter from './DateFilter'
import { IconButton, Tooltip } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import Search_bar from '../components/Search_bar'
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew'

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
		backgroundColor: theme.palette.secondary.main,
	}
})

class Header extends Component{
	constructor(props){
		super(props)
		this.state = {
			filterOpen: false,
		}
	}

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

	       	  <Avatar className={classes.primaryAvatar}>
	       	  	<TrendingUpIcon/>
	       	  </Avatar>
	          
	          <Typography className={classes.flex} variant="title" color="inherit">
	            Student Analytics
	          </Typography>
				<IconButton>
					<FilterListIcon onClick={e => this.setState({ filterOpen: !this.state.filterOpen })} />
				</IconButton>
				
					<DateFilter style={{marginRight: 15}} open={this.state.filterOpen} onChange={this.props.changeRootFilter} />
			
			  <div >
	          	<Search_bar />
	          </div>
				
			  <IconButton
				  aria-label="open-chatbot"
				  onClick={this.props.handleChatbot}
			  >
						<ChatBubbleIcon style={{color: theme.palette.secondary.light}}/>
				  </IconButton>
				  <a href="/api/logout" target="_self">
				 <IconButton>
				 	<PowerSettingsNewIcon/>
				 </IconButton>
				 </a>
	        </Toolbar>
	      </AppBar>
		)
	}
}

export default withStyles(styles, {withTheme:true})(Header)