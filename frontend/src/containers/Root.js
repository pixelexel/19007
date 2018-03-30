import React, { Component } from 'react'
import { screens } from '../actions/root'
import { connect } from 'react-redux'
import HomeScreenContainer from './HomeScreenContainer'
import StudentContainer from './StudentContainer'
import Header from '../components/Header'
import DrawerComponent from './DrawerComponent'
import { toggleDrawer } from '../actions/root'
import { toggleChatbot } from '../actions/chatbot'
import { changeScreen } from '../actions/root'
import CountryContainer from './CountryContainer'
import StateContainer from './StateContainer'
import DistrictContainer from './DistrictContainer'
import SchoolContainer from './SchoolContainer'
import Chatbot from '../containers/Chatbot'
import AddFilterContainer from '../containers/AddFilterContainer'
import '../styles/App.scss'
import { getStateData } from '../actions/state'


const mapStateToProps = (state) => ({
	screen: state.root.screen,
	drawer: state.root.drawer,
	id: state.root.id,
})

class Root extends Component{
	toggleDrawer = () => {
		this.props.dispatch(toggleDrawer())
	}

	closeDrawer = () => {
		if(this.props.drawer.open)
			this.toggleDrawer()
	}

	toggleChatbot = () => {
		console.log('handling chatbot')
		this.props.dispatch(toggleChatbot())
	}

	render(){
		const { screen, id } = this.props 
		let screenComponent = null

		switch(screen){
			case screens.DASH:
				screenComponent = <HomeScreenContainer screen={screen} id={id}/>
				break

			case screens.SCHOOL:
				screenComponent = <SchoolContainer id={id}/>
				break

			case screens.DISTRICT:
				screenComponent = <DistrictContainer id={id}/>
				break

			case screens.STATE:
				this.props.dispatch(getStateData(id))
				screenComponent = <StateContainer id={id}/>
				break

			case screens.COUNTRY:
				screenComponent = <CountryContainer/>
				break

			case screens.STUDENT:
				screenComponent = <StudentContainer id={id}/>
				break
			
			case screens.ADD_FILTER:
				screenComponent = <AddFilterContainer />
				break

			default:
				screenComponent = null
		}

		return (
			<div>
				<Header handleMenuClick={this.toggleDrawer}
						handleChatbot={this.toggleChatbot}
						changeScreen={changeScreen} 
						{...this.props}/>
				<div className={this.props.drawer.open ? 'root-screen-hide': ''} 
						onClick={this.closeDrawer}>
				{screenComponent}
				</div>
				<DrawerComponent/>
				<Chatbot/>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Root)