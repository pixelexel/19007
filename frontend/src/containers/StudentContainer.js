import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudentData } from '../actions/student'
import { Grid, Card, Avatar,
	 CardContent, Typography, LinearProgress, Divider } from 'material-ui'
import BookIcon from 'material-ui-icons/Book'
import { withStyles } from 'material-ui/styles'
import IDCard from '../components/student/IDCard'
import Progress from '../components/student/Progress'
import GraphComponent from '../components/GraphComponent'
import AnalyticsCard from '../components/AnalyticsCard'

const styles = theme => ({
	avatar: {
		height: 120,
		width: 120,
		margin: 'auto'
	},
	name: {
		textAlign: 'center',
		fontSize: '1.25rem',
		fontWeight: 700,
		marginTop: 15,
	},
	textCenter: {
		textAlign: 'center',
		color: '#898C92',
	},
	card: {
		padding: 15,
	}
})

const niceColor = '#898C92'

function mapStateToProps(state){
	return {
		student: state.student,
	}
}

class StudentContainer extends Component{
	componentWillMount(){
		const { id } = this.props 
		this.props.dispatch(getStudentData(id))
	}

	componentWillReceiveProps(newProps){
		if(newProps.id != this.props.id){
			this.props.dispatch(getStudentData(newProps.id))
		}
	}

	static defaultProps = {
		details: {
			name: 'Saumitra Bose',
			school: 'DJ Sanghvi College of Engineering',
		}
	}

	render(){
		const { classes, theme } = this.props
		// x, y, filters, data, name, type
		console.log('student', this.props)
		const { data, acad_data, sport_data, c_data, d_data, details } = this.props.student
		let last_acad, last_sport, last_curr
		let ret = {}

		if(acad_data && acad_data.length > 0){
			last_acad = acad_data[acad_data.length-1]['uv']/10
			last_sport = sport_data[sport_data.length - 1]['uv']
			last_curr = c_data[c_data.length - 1]['uv']
			ret = {
				x: 'domain',
				y: 'strength',
				data: [
						{'domain': 'academics', 'strength': last_acad, 'filter': 0},
						{ 'domain': 'extra', 'strength': last_curr, 'filter': 0 },
						{ 'domain': 'sports', 'strength': last_sport, 'filter': 0 },
				],
				filters: [],
				type: 'RADAR',
				name: 'Student Strengths',
			}
		}

		return (
				<Grid container style={{margin: 25, maxWidth: 'calc(100% - 50px)'}}>
					<Grid item xs={3}>
						<IDCard {...details}/>
					</Grid>
					<Grid item xs={3}>
						<Progress data={data[0]} style={{marginBottom: 25}}/>
						<Progress data={data[1]}/>
					</Grid> 
					<Grid item xs={3}>
						<Progress data={data[2]} style={{marginBottom: 25}}/>
						<Progress data={data[3]} />
					</Grid>	
					<Grid item xs={3}>
						<Card style={{ height: 'calc(100%)', width:'100%' }}>

						{acad_data.length > 0 && <GraphComponent legendOff data={ret} height='100%' margin={{ top: 5, right: 5, left: 5, bottom: 5 }} />}	
						</Card>
					</Grid>
					<Grid item xs={4}>
						
					</Grid>
				</Grid>
		)
	}
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(StudentContainer))