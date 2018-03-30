 import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSchoolData } from '../actions/school'
import School from '../components/student/School';
function mapStateToProps(state){
	return {
	school: state.school,
    p_marks: state.school.p_marks,
    p_sport: state.school.p_sport,
    top_extra_curr : state.school.top_extra_curr, 
    s_n: state.school.s_n,
    avg_marks: state.school.avg_marks,
    avg_sport:state.school.avg_sport,
    avg_extra_curr:state.school.avg_extra_curr,
    b_marks:state.school.b_marks,
    g_marks:state.school.g_marks,
    p_c:state.school.p_c,
    p_b:state.school.p_b,
    p_g:state.school.p_g,		
	}
}

class SchoolContainer extends Component{
	componentWillMount(){
		console.log('school', this.props)

		this.props.dispatch(getSchoolData(this.props.id, {
			filters: this.props.filters,
		}))
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