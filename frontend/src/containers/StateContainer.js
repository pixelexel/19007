import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStateData } from '../actions/state'
import State from '../components/student/State';
function mapStateToProps(state){
	return {
		state : state.state,
		pp_data: state.state.pp_data,
		no_ss: state.state.no_ss,
		ex_curr: state.state.ex_curr,	
		sports_data: state.country.sports_data,
    	acad_list: state.country.acad_list,
    	sports_list: state.country.sports_list, 	
	}
}

class StateContainer extends Component{
	componentWillMount(){
		console.log('state', this.props)

		this.props.dispatch(getStateData(this.props.id))
	}

	render(){
		return (
			<div>
				<State {...this.props}/>
			</div>
		)
	}
}

export default connect(mapStateToProps)(StateContainer)