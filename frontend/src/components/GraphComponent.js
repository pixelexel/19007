import React, { Component } from 'react'
import { ResponsiveContainer, Label, LineChart, CartesianGrid, 
		XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import { withStyles } from 'material-ui/styles' 
import '../styles/graph.scss'

const style = {
	width: '95%',
	height: 'calc(100% - 100px)',
	fontWeight: 'normal',
	margin:'0 auto',
	position: 'relative',
}

const styles = (theme) => ({
	root: {
		backgroundColor: theme.palette.secondary.light,
		color: theme.palette.secondary.contrastText + ' !important',
	}
})

class GraphComponent extends Component{
	render(){
		// let i = Math.floor(Math.random()*360) 
		let i = -15
		const getNextColor = () => {
			i+= 60
			i%= 360
			return `hsl(${i}, 100%, 50%)`
		}

		let {x, y, filters, data, name} = this.props.data
		const { classes, theme } = this.props
		return(
			<div style={style} className={classes.root}>
			<ResponsiveContainer width='100%' height="100%">
				<LineChart data={data} margin={{ top: 5, right: 25, left: 2, bottom: 25 }}>
				  <CartesianGrid strokeDasharray="1 1" />
				  <XAxis dataKey={x}>
				  	<Label value={x} offset={-15} position="insideBottom" />
				  </XAxis>
				  <YAxis />
				  <Tooltip />
				  <Legend verticalAlign="top" height={36}/>
				  <Line type="monotone" dataKey={y}
				  		 stroke={getNextColor()} 
				  		 dot={{fill: theme.palette.secondary.light}} />
				  { filters.map((filter, index) => (
				  		<Line key={filter.name + filter.op + filter.val} type="monotone" 
				  			dataKey={`${filter.name} ${filter.op} ${filter.val}`} 
				  			stroke={getNextColor()} 
				  			dot={{fill: theme.palette.secondary.light}}/>
				  
				  ))}
				  
				</LineChart>
			</ResponsiveContainer>
			</div>
			
		)
	}
}

export default withStyles(styles, {withTheme: true})(GraphComponent)