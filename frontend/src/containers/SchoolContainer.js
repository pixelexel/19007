 import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSchoolData } from '../actions/school'
import School from '../components/student/School';
function mapStateToProps(state){
	return {
	school: state.school,
    pp_data: state.school.pp_data,
    ss_no: state.school.ss_no,
    ex_curr: state.school.ex_curr,  
    sport_d: state.school.sport_d,
    top_marks: state.school.top_marks,
    top_sport: state.school.top_sport,
    top_extra_curr : state.school.top_extra_curr, 		
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