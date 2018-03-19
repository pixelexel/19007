import React, { Component } from 'react'
import { ResponsiveContainer, Label, LineChart, CartesianGrid, 
		XAxis, YAxis, ZAxis, Tooltip, Legend, Line,
		AreaChart, Area, ScatterChart, Scatter, BarChart, Bar,
		Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { withStyles } from 'material-ui/styles' 
import '../styles/graph.scss'

export const graphTypes = {
	LINE: 'LINE',
	BAR: 'BAR',
	AREA: 'AREA',
	SCATTER: 'SCATTER',
	RADAR: 'RADAR',
}

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

const getFilterName = filter => `${filter.name}${filter.op}${filter.val}`

class GraphComponent extends Component{
	constructor(props){
		super(props)
		this.colorIndex = 11
	}

	getNextColor = () => {
		this.colorIndex += 25
		this.colorIndex %= 360
		return `hsl(${this.colorIndex}, 92%, 59%)`
	}

	getLineChart = (min, max, margin) => {
		let {x, y, filters, data, name} = this.props.data
		const { classes, theme } = this.props

		return (
			<LineChart data={data} margin={margin}>
			  <CartesianGrid strokeDasharray="1 1" />
			  <XAxis dataKey={x}>
			  	<Label value={x} offset={-15} position="insideBottom" />
			  </XAxis>
			  <YAxis dataKey={y} domain={[min, max]}>
			  	<Label angle={270}  value={y} dy={50} offset={-5} position="insideLeft" />
			  </YAxis>
			  <Tooltip />
			  <Legend verticalAlign="top" height={36}/>
			  <Line type="monotone" dataKey={y}
			  		name="none"
			  		 stroke={this.getNextColor()} 
			  		 dot={{fill: theme.palette.secondary.light}} />
			  		 
			  { filters.map((filter, index) => (
			  		<Line key={getFilterName(filter)} type="monotone" 
			  			dataKey={getFilterName(filter)} 
			  			name={getFilterName(filter)}
			  			stroke={this.getNextColor()} 
			  			dot={{fill: theme.palette.secondary.light}}/>
			  
			  ))}
			  
			</LineChart>
		)
	}

	getAreaChart = (min, max, margin) => {
		let {x, y, filters, data, name} = this.props.data
		const { classes, theme } = this.props
		let color = this.getNextColor()

		return(
			<AreaChart data={data} margin={margin}>
			  <CartesianGrid strokeDasharray="1 1" />
			  <XAxis dataKey={x}>
			  	<Label value={x} offset={-15} position="insideBottom" />
			  </XAxis>
			  <YAxis dataKey={y} domain={[min, max]}>
			  	<Label angle={270}  value={y} dy={50} offset={-5} position="insideLeft" />
			  </YAxis>
			  <Tooltip />
			  <Legend verticalAlign="top" height={36}/>
			  <Area type="natural" dataKey={y} stroke={color} 
			  	fillOpacity={1} fill={color}
			  	name="none"
			  	fillOpacity={0.7}
			  	dot={{fill: theme.palette.secondary.light}}/>

			  { filters.map((filter, index)=>{
			  	let color = this.getNextColor()
			  	return (<Area type="natural"
					  		key={index}
					  		name={getFilterName(filter)}
					  		dataKey={getFilterName(filter)} 
					  		stroke={color} 
					  		fillOpacity={0.7 - index*0.15}
					  		fill={color} 
					  		dot={{fill: theme.palette.secondary.light}}/>)})
			}
			</AreaChart>
		)
	}

	getScatterChart = (min, max, margin) => {
		let {x, y, filters, data, name} = this.props.data
		const { classes, theme } = this.props
		return (
			<ScatterChart margin={margin}>
			  <CartesianGrid strokeDasharray="3 3" />
			  <XAxis type="number" dataKey={'x'}>
				  	<Label value={x} offset={-15} position="insideBottom" />
				  </XAxis>
				  <YAxis type="number" dataKey={'y'} domain={[min, max]}>
				  	<Label angle={270}  value={y} dy={50} offset={-5} position="insideLeft" />
				  </YAxis>
			  <Tooltip/>
			  <Legend verticalAlign="top" height={36}/>
			  <Scatter name="none" data={data.map(d=> ({x: d[x], y: d[y]}))} fill={this.getNextColor()} />
			  { filters.map((filter, index) => {
			  		const filterName = getFilterName(filter)
			  		return (
			  			<Scatter name={filterName} 
			  				key={index}
			  				data={data.map(d=>({x: d[x], y: d[filterName]}))} 
			  				fill={this.getNextColor()} />
			  		)
			  	})
			  }
			</ScatterChart>

			
		)
	}

	getBarChart = (min, max, margin) =>{
		let {x, y, filters, data, name} = this.props.data
		const { classes, theme } = this.props

		return (
			<BarChart data={data} margin={margin}>
		       <CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey={'x'}>
				  	<Label value={x} offset={-15} position="insideBottom" />
				  </XAxis>
				  <YAxis dataKey={'y'} domain={[min, max]}>
				  	<Label angle={270}  value={y} dy={50} offset={-5} position="insideLeft" />
				  </YAxis>
				<Tooltip/>
				<Legend verticalAlign="top" height={36}/>
				<Bar dataKey={y} stackId="a" fill={this.getNextColor()} />
				{filters.map((filter, index) => (
					<Bar key={index} dataKey={getFilterName(filter)} 
						
						fill={this.getNextColor()} />
				))}
				
	      	</BarChart>
		)
	}

	getRadarChart = (min, max, margin) => {
		let {x, y, filters, data, name} = this.props.data
		const { classes, theme } = this.props
		margin.bottom = 0

		let color = this.getNextColor()

		return (
			<RadarChart margin={margin} data={data}>
	          <PolarGrid />
	          <Legend verticalAlign="top" height={36}/>
	          <PolarAngleAxis dataKey={x} />
	          <PolarRadiusAxis angle={360/data.length } domain={[min, max]}/>
	          <Radar name={'none'} dataKey={y} stroke={color} fill={color} fillOpacity={0.6}/>
	          {filters.map((filter, index)=> {
	          	color = this.getNextColor()
	          	return (
	          		<Radar key={index} name={getFilterName(filter)} 
	          			dataKey={getFilterName(filter)} 
	          			stroke={color}
	          			fill={color} fillOpacity={0.6}/>
	          	)
	          })}
	          
	        </RadarChart>
		)
	}

	getGraph = (type, min, max, margin) =>{
		switch(type){
			case graphTypes.LINE:
				return this.getLineChart(min, max, margin)
			case graphTypes.SCATTER:
				return this.getScatterChart(min, max, margin)
			case graphTypes.BAR:
				return this.getBarChart(min, max, margin)
			case graphTypes.RADAR:
				return this.getRadarChart(min, max, margin)
			case graphTypes.AREA:
				return this.getAreaChart(min, max, margin)
			default:
				return null
		}
	}

	render(){
		this.colorIndex = 11
		let { x, y, filters, data, name, type } = this.props.data
		const { classes, theme } = this.props
		const margin = { top: 5, right: 25, left: 20, bottom: 25 }
		let min = 100000000
		let max = -100000000

		for(let i in data)
		{
			let keys = Object.keys(data[i])
			for(let k in keys) {
				let j = keys[k]
				if(j == x) continue
				max = Math.max(max, data[i][j])
				min = Math.min(min, data[i][j])
			}
		}

		max = Math.ceil(max + max*0.15)
		min = Math.floor(min - min*0.15)

		return(
			<div style={style} className={classes.root}>
				<ResponsiveContainer width='100%' height="100%">
					{this.getGraph(type, min, max, margin)}
				</ResponsiveContainer>
			</div>
			
		)
	}
}

export default withStyles(styles, {withTheme: true})(GraphComponent)