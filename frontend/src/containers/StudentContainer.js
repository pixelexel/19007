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
		const { id } = this.props 
		console.log('student', this.props, id)
		this.props.dispatch(getStudentData(id))
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