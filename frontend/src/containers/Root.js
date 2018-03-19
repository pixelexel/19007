import React, { Component } from 'react'
import { screens } from '../actions/root'
import { connect } from 'react-redux'
import HomeScreenContainer from './HomeScreenContainer'
import StudentContainer from './StudentContainer'
import Header from '../components/Header'
import DrawerComponent from './DrawerComponent'
import { toggleDrawer } from '../actions/root'
import '../styles/App.scss'

const mapStateToProps = (state) => ({
	screen: state.root.screen,
	drawer: state.root.drawer,
})

class Root extends Component{
	toggleDrawer = () => {
		this.props.dispatch(toggleDrawer())
	}

	closeDrawer = () => {
		if(this.props.drawer.open)
			this.toggleDrawer()
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
				<Header handleMenuClick={this.toggleDrawer} {...this.props}/>
				<div className={this.props.drawer.open ? 'root-screen-hide': ''} onClick={this.closeDrawer}>
				{screenComponent}
				</div>
				<DrawerComponent/>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Root)