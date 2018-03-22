import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getSuggestion } from '../actions/searchbar'

const mapStateToProps = (state) => {
	return {
		district: state.searchBar.district,
		school: state.searchBar.school,
		student: state.searchBar.student,
		state: state.searchBar.state,
	}
}
class Search_bar extends Component{
	constructor(props){
		super(props)
		this.state = {
			searchText: '',
		}
	}

	onTextChange = (e) => {
		this.setState({searchText: e.target.value})
	}

	on_click = () => {
		this.props.dispatch(getSuggestion({query:this.state.searchText}))
	}

	render(){
		console.log('SearchBar', this.props.student)
		return(
			<div>
				<input type='text' onChange={this.onTextChange} placeholder='Search' id='search_input' value={this.state.searchText}/>
				<button value='Search' onClick={this.on_click}/>
		    </div>
		)
	}
}

export default connect(mapStateToProps)(Search_bar);