import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSchoolData } from '../actions/school'
import School from '../components/student/School';
function mapStateToProps(state){
	return {
		school : state.school,
		pp_data: state.school.pp_data,
		no_ss: state.school.no_ss,
		ex_curr: state.school.ex_curr,		
	}
}

class SchoolContainer extends Component{
	componentWillMount(){
		console.log('school', this.props)

		this.props.dispatch(getSchoolData(this.props.id))
	}

	render(){
		return (
			<div>
				<School {...this.props}/>
			</div>
		)
	}
}

export default connect(mapStateToProps)(SchoolContainer)