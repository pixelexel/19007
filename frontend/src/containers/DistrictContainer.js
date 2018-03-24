import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDistrictData } from '../actions/district'
import District from '../components/student/District';
function mapStateToProps(state){
	return {
		district : state.district,
		pp_data: state.district.pp_data,
		no_ss: state.district.no_ss,
		ex_curr: state.district.ex_curr,
		sports_data: state.country.sports_data,
    	acad_list: state.country.acad_list,
    	sports_list: state.country.sports_list, 		
	}
}

class DistrictContainer extends Component{
	componentWillMount(){
		console.log('district', this.props)

		this.props.dispatch(getDistrictData(this.props.id))
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