import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudentData } from '../actions/student'
import GridSet from '../components/student/GridSet';

function mapStateToProps(state){
	return {
		student: state.student,
	}
}

class StudentContainer extends Component{
	componentWillMount(){
		console.log('student', this.props)
		this.props.dispatch(getStudentData())
	}

	render(){
		return (
			<div>
        		<GridSet {...this.props} />
			</div>
		)
	}
}

export default connect(mapStateToProps)(StudentContainer)