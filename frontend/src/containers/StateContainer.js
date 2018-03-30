import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStateData } from '../actions/state'
import State from '../components/student/State';
function mapStateToProps(state){
	return {
		state: state.state,
    pp_data: state.state.pp_data,
    ss_no: state.state.ss_no,
    ex_curr: state.state.ex_curr,  
    sport_d: state.state.sport_d,
    top_marks: state.state.top_marks,
    top_sport: state.state.top_sport,
    top_extra_curr : state.state.top_extra_curr, 
    t_s_a : state.state.t_s_a,
    t_s_s : state.state.t_s_s,
    t_s_e : state.state.t_s_e,
    p_c : state.state.p_c,
    p_b :state.state.p_b,
    p_g :state.state.p_g,
    s_n : state.state.s_n,
    districts:state.state.districts,	
	}
}

class StateContainer extends Component{
	componentWillMount(){
		console.log('state', this.props)

		this.props.dispatch(getStateData(this.props.id, {
      filters: this.props.filters,
    }))
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