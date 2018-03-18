import React, { Component } from 'react'
import { screens } from '../actions/root'
import { connect } from 'react-redux'
import HomeScreenContainer from './HomeScreenContainer'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TrendingUpIcon from 'material-ui-icons/TrendingUp'
import Avatar from 'material-ui/Avatar'

const mapStateToProps = (state) => ({
	screen: state.root.screen
})

const styles = theme => ({
	primaryAvatar: {
		color: '#fff',
		backgroundColor: theme.palette.primary.main,
		marginRight: 30,
		height: 40,
		width: 40
	}
})

class Root extends Component{
	render(){
		const { screen, classes } = this.props 
		let screenComponent = null

		switch(screen){
			case screens.DASH:
			case screens.COUNTRY:
			case screens.STATE: 
			case screens.SCHOOL: 
			case screens.DISTRICT:
				screenComponent = <HomeScreenContainer id={screen}/>
				break

			case screens.STUDENT:
				screenComponent = null
				break
			default:
				screenComponent = null
		}

		return (
			<div>
				<AppBar position="static" color="default">
			       <Toolbar>
			       	  <Avatar className={classes.primaryAvatar}>
			       	  	<TrendingUpIcon/>
			       	  </Avatar>
			          <Typography variant="title" color="inherit">
			            Student Analytics
			          </Typography>
			        </Toolbar>
			      </AppBar>

			      
				{screenComponent}
			</div>
		)
	}
}

export default withStyles(styles)(connect(mapStateToProps)(Root))