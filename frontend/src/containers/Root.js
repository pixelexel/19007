import React, { Component } from 'react'
import { screens, setRootFilter } from '../actions/root'
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
	name: state.root.name,
	filters: state.root.filters,
	routing: state.routing,
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
	
	changeRootFilter = (data) => {
		const { match } = this.props
		const { start, end} = data
		let screen = match.params.screen || screens.COUNTRY
		let id = match.params.id

		this.props.dispatch(setRootFilter(start, end, screen, id))
	}

	render(){
		const { filters, routing, match } = this.props 
		let screenComponent = null
		let screen, id
		if(match.path == '/addfilter'){
			screen = screens.ADD_FILTER
		}
		else if(match.params.screen){
			screen = match.params.screen
			id = match.params.id
		} else {
			screen = screens.COUNTRY
			id = 1
		}
				
		switch(screen.toUpperCase()){
			case screens.DASH:
				screenComponent = <HomeScreenContainer screen={screen} id={id} name={this.props.name}/>
				break

			case screens.SCHOOL:
				screenComponent = <SchoolContainer filters={filters} id={id}/>
				break

			case screens.DISTRICT:
				screenComponent = <DistrictContainer filters={filters} id={id}/>
				break

			case screens.STATE:
				screenComponent = <StateContainer filters={filters} id={id}/>
				break

			case screens.COUNTRY:
				screenComponent = <CountryContainer filters={filters}/>
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
						changeRootFilter={this.changeRootFilter}
						filters={this.props.filters}
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