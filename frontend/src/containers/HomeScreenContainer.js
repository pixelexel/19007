import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button'
import PopupContainer from '../components/PopupContainer'
import { openPopup, closePopup, setScreen } from '../actions/popup'

/*
	HomeScreenContainer is a container component. It is stateful,
	and can dispatch actions to the store
*/

// Map the state (from store) to props -> Redux function
function mapStateToProps(state){
	return state
}

const styles = theme => ({
	fab: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2,
	}
})


class HomeScreenContainer extends Component{
	constructor(props){
		super(props)
		this.showPopup = this.showPopup.bind(this)
		this.hidePopup = this.hidePopup.bind(this)
		this.changePopupScreen = this.changePopupScreen.bind(this)
	}

	showPopup(defaults){
		this.props.dispatch(openPopup(defaults))
	}

	hidePopup(){
		this.props.dispatch(closePopup())
	}

	changePopupScreen(screen){
		this.props.dispatch(setScreen(screen))
	}

	render(){
		console.log('HomeScreenContainer', this.props)
		const {classes} = this.props

		return (
			<div>
				<PopupContainer {...this.props.popup} 
						onClose={this.hidePopup} 
						setScreen={this.changePopupScreen}/>

				<Button variant="fab" 
						className={classes.fab} 
						color="primary"
						onClick={this.showPopup.bind(this)}>
						<AddIcon/>
				</Button>
			</div>
		)
	}
}

const HomeScreenContainerWrapper = withStyles(styles, {withTheme: true})(HomeScreenContainer)
export default connect(mapStateToProps)(HomeScreenContainerWrapper)