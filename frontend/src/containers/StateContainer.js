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
	}
}

class StateContainer extends Component{
	componentWillMount(){
		console.log('state', this.props)

		this.props.dispatch(getStateData())
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