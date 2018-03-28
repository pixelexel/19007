import React, { Component } from 'react'
import { ResponsiveContainer, Label, LineChart, CartesianGrid, 
		XAxis, YAxis, ZAxis, Tooltip, Legend, Line  } from 'recharts'
import { VictoryChart, VictoryBar, VictoryTheme, VictoryStack, VictoryLegend, VictoryAxis } from 'victory'
import { withStyles } from 'material-ui/styles' 
import '../styles/graph.scss'

export const graphTypes = {
	LINE: 'LINE'
}

const style = {
	width: '100%',
	height: '100%',
	fontWeight: 'normal',
	margin:'0 auto',
	position: 'relative',
}

const styles = (theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.secondary.contrastText + ' !important',
	}
})

const getFilterName = filter => `${filter.name}${filter.op}${filter.val}`

class GraphComponentMultiLine extends Component{
	constructor(props){
		super(props)
		this.colorIndex = 11
	}

	getNextColor = () => {
		this.colorIndex += 25
		this.colorIndex %= 360
		return `hsl(${this.colorIndex}, 92%, 59%)`
	}

	getLineChart = (min, max, margin, data) => {
		const { classes, theme } = this.props
		let datan = data.map( d => Object.assign({}, d, {
				sport_data: d['sport_data']*10,
				c_data: d['c_data']*10,
			})
		);
		console.log('dataaaaaaaaaaaa',datan) 
		return (
			<LineChart data={datan} margin={margin}>
			  <XAxis dataKey={'date'}>
			  	<Label value={'date'} offset={-15} position="insideBottom" />
			  </XAxis>
			  <YAxis dataKey={'acad_data'} domain={[min, max]}>
			  	<Label angle={270}  value={'Score'} dy={50} offset={-5} position="insideLeft" />
			  </YAxis>
			  <Tooltip />
			  <Legend verticalAlign="top" height={36}/>
			  <Line type="monotone" dataKey={'acad_data'}
			  		name="Academics"
					   stroke={this.getNextColor()} 
					   dot={null}
			  		  />

			  <Line type="monotone" dataKey={'sport_data'}
			  		name='Sports'
			  		 stroke={this.getNextColor()} 
			  		 dot={null} />	

			  <Line type="monotone" dataKey={'c_data'}
			  		name='Extra Curriculars'
			  		 stroke={this.getNextColor()} 
			  		 dot={null} />	
			  <Line type="monotone" dataKey={'d_data'}
			  		name='Attendance'
			  		 stroke={this.getNextColor()} 
			  		 dot={null} />	  
			  
			</LineChart>
		)
	}

	render(){
		console.log('graphsss',this.props)
		const { acad_data, sport_data, c_data, d_data } = this.props
		let data = []
		
		for(let i=0; i<acad_data.length; i++){
			data.push({
				'date':acad_data[i]['name'],
				'acad_data': acad_data[i]['uv'],
				'c_data': c_data[i]['uv'],
				'd_data': d_data[i]['uv'],
				'sport_data': sport_data[i]['uv'],
			})
		}

		this.colorIndex = 11
		const { classes, theme } = this.props
		let min = 0
		let max = 100
		
		return(
			<div style={style} className={classes.root}>
				<ResponsiveContainer width='100%' height="100%">
					{this.getLineChart(min, max, { top: 5, right: 25, left: 20, bottom: 25 }, data)}
				</ResponsiveContainer>
			</div>
			
		)
	}
}

export default withStyles(styles, {withTheme: true})(GraphComponentMultiLine)