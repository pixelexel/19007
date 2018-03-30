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

const mapStateToProps = (state) => ({
	screen: state.root.screen,
	drawer: state.root.drawer,
	id: state.root.id,
	name: state.root.name,
	filters: state.root.filters,
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
		const { start, end} = data
		this.props.dispatch(setRootFilter(start, end))
	}

	render(){
		const { screen, id, filters } = this.props 
		let screenComponent = null
		
		switch(screen){
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