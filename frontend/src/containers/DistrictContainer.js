import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDistrictData } from '../actions/district'
import District from '../components/student/District';
function mapStateToProps(state){
	return {
		district: state.district,
    pp_data: state.district.pp_data,
    ss_no: state.district.ss_no,
    ex_curr: state.district.ex_curr,  
    sport_d: state.district.sport_d,
    top_marks: state.district.top_marks,
    top_sport: state.district.top_sport,
    top_extra_curr : state.district.top_extra_curr, 
    t_s_a : state.district.t_s_a,
    t_s_s : state.district.t_s_s,
    t_s_e : state.district.t_s_e,
    p_c : state.district.p_c,
    p_b :state.district.p_b,
    p_g :state.district.p_g,
    s_n : state.district.s_n,
    schools : state.district.schools,			
	}
}

class DistrictContainer extends Component{
	componentWillMount(){
		console.log('district', this.props)

		this.props.dispatch(getDistrictData(this.props.id, {
      filters: this.props.filters,
    }))
	}

	render(){
		return (
			<div>
				<District {...this.props}/>
			</div>
		)
	}
}

export default connect(mapStateToProps)(DistrictContainer)