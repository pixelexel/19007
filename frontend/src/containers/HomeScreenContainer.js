import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSearchResults } from '../actions'
import SearchCard from '../components/SearchCard'

/*
	HomeScreenContainer is a container component. It is stateful,
	and can dispatch actions to the store
*/

// NOTE: Will contain 4 cards eventually

// Map the state (from store) to props -> Redux function
function mapStateToProps(state){
	return {
		search: state.search
	}
}

class HomeScreenContainer extends Component{
	constructor(props){
		super(props)
		this.handleSearchClick = this.handleSearchClick.bind(this)
	}

	handleSearchClick(query){
		this.props.dispatch(fetchSearchResults(query))
	}

	render(){
		console.log('HOMESCREEN', this.props.search)
		const {data, isFetching} = this.props.search

		return (
			<div>
			<SearchCard 
				onClick={this.handleSearchClick}
				isFetching={isFetching}
				data={data}
			/>
			</div>
		)
	}
}

export default connect(mapStateToProps)(HomeScreenContainer)