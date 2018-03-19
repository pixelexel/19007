import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridSet from '../components/student/GridSet';

function mapStateToProps(state){
	return {

	}
}

class StudentContainer extends Component{
	render(){
		const { classes } = this.props;
		return (
			<div>
        		<GridSet/>
			</div>
		)
	}
}

export default connect(mapStateToProps)(StudentContainer)