import React, { Component } from 'react'
import { screens } from '../actions/root'
import { connect } from 'react-redux'
import HomeScreenContainer from './HomeScreenContainer'
import StudentContainer from './StudentContainer'
import Header from '../components/Header'
import DrawerComponent from '../components/DrawerComponent'
import { toggleDrawer } from '../actions/root'

const mapStateToProps = (state) => ({
	screen: state.root.screen,
})

class Root extends Component{
	toggleDrawer = () => {
		this.props.dispatch(toggleDrawer())
	}

	render(){
		const { screen } = this.props 
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
				screenComponent = <StudentContainer id={screen}/>
				break
			default:
				screenComponent = null
		}

		return (
			<div>
				<Header handleMenuClick={this.toggleDrawer}/>
				{screenComponent}
				<DrawerComponent/>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Root)