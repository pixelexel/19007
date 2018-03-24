import React, { Component } from 'react'
import { ResponsiveContainer, Label, LineChart, CartesianGrid, 
		XAxis, YAxis, ZAxis, Tooltip, Legend, Line,
		AreaChart, Area, ScatterChart, Scatter, BarChart, Bar,
		Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { VictoryChart, VictoryBar, VictoryTheme, VictoryStack, VictoryLegend, VictoryAxis } from 'victory'
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
		const {x, y, filters, data, name} = this.props.data
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
					   dot={null}
			  		  />

			  <Line type="monotone" dataKey={'filter'}
			  		name={filters.map(filter=> getFilterName(filter) ).join(', ')}
			  		 stroke={this.getNextColor()} 
			  		 dot={null} />	  
			  
			</LineChart>
		)
	}

	/*
	dot={{fill: theme.palette.secondary.light}}
	*/

	/*
	{ filters.map((filter, index) => (
			<Line key={getFilterName(filter)} type="monotone" 
				dataKey={getFilterName(filter)} 
				name={getFilterName(filter)}
				stroke={this.getNextColor()} 
				dot={{fill: theme.palette.secondary.light}}/>
	
	))}
	*/

	getAreaChart = (min, max, margin) => {
		let {x, y, filters, data, name} = this.props.data
		const { classes, theme } = this.props
		let color = this.getNextColor()
		let color2 = this.getNextColor()

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
			  	<Area type="natural" dataKey={'filter'} stroke={color2} 
			  		fillOpacity={1} fill={color2}
			  		name={filters.map(filter=> getFilterName(filter) ).join(', ')}
			  		fillOpacity={0.7}
			  		dot={{fill: theme.palette.secondary.light}}/>

				  
			</AreaChart>
		)
	}

	/*
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

	*/

	getScatterChart = (min, max, margin) => {
		let {x, y, filters, data, name} = this.props.data
		const { classes, theme } = this.props
		console.log('SCATTER', this.props.data)
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
			  <Scatter name="none" data={data.map(d => ({x: parseInt(d[x]), y: parseInt(d[y])}))} fill={this.getNextColor()} />
			  <Scatter name={filters.map(filter=> getFilterName(filter) ).join(', ')} 
			  	data={data.map(d=> ({x: parseInt(d[x]), y: parseInt(d['filter'])}))} 
			  	fill={this.getNextColor()} />
			</ScatterChart>
		)
	}

	/*
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
	*/

	getBarChart = (min, max, margin) =>{
		let {x, y, filters, data, name} = this.props.data
		const { classes, theme } = this.props
		

		const vdata = data.map(d => ({
			x: d[x],
			y: d[y],
		}))

		const vfdata = data.map(d => ({
			x: d[x],
			y: d['filter'],
		}))

		const color1 = this.getNextColor()
		const color2 = this.getNextColor()

		console.log('bar data', data, vdata, vfdata)

		return (
			<VictoryChart
				domainPadding={{ x: 15 }}>
				<VictoryLegend 
					orientation="horizontal"
					x={250}
					style={{ labels: { fill: "#fff" }, }}
					data={[
						{ name: "No Filter", symbol: { fill: color1,} },
						{ name: filters.map(filter => getFilterName(filter)).join(', '), symbol: { fill: color2 } }
					]}
				/>
				<VictoryAxis
					label={x}
					tickValues={data.map(d=>d[x])}
					style={
						{
							tickLabels: {
								stroke: '#fff',
								fill: '#fff',
								color: '#fff',
							},
							axis: {
								stroke: '#fff'
							},
							axisLabel: {stroke: '#fff'}
						}
					}
				/>

				<VictoryAxis
					label={y}
					dependentAxis
					style={
						{
							tickLabels: {
								stroke: '#fff',
								fill: '#fff',
								color: '#fff',
							},
							axis: {
								stroke: '#fff'
							},
							axisLabel: { stroke: '#fff' }
						}
					}
				/>
				

				
					<VictoryBar
						key={0}
						style={{
							data: {
								fill: color1,
								width: 22
							},
						}}
						data={vdata}
					/>
					<VictoryBar
						key={1}
						style={{
							data: {
								fill: color2,
								width: 22,
							}
						}}
						data={vfdata}
					/>
			</VictoryChart>
		)
	}

	/*
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
				<Bar dataKey={y} name="none" fill={this.getNextColor()} />
				<Bar dataKey={'filter'}
					name={filters.map(filter=> getFilterName(filter) ).join(', ')}
					fill={this.getNextColor()} />
	      	</BarChart>
	*/
	/*
		{filters.map((filter, index) => (
			<Bar key={index} dataKey={getFilterName(filter)} 
				
				fill={this.getNextColor()} />
		))}
	*/

	getRadarChart = (min, max, margin) => {
		let {x, y, filters, data, name} = this.props.data
		const { classes, theme } = this.props
		margin.bottom = 0

		let color = this.getNextColor()
		let color2 = this.getNextColor()

		return (
			<RadarChart margin={margin} data={data}>
	          <PolarGrid />
	          <Legend verticalAlign="top" height={36}/>
	          <PolarAngleAxis dataKey={x} />
	          <PolarRadiusAxis angle={360/data.length } domain={[min, max]}/>
	          <Radar name={'none'} dataKey={y} stroke={color} fill={color} fillOpacity={0.6}/>
			  <Radar name={filters.map(filter=> getFilterName(filter) ).join(', ')} 
			  		dataKey={'filter'} 
			  		stroke={color2} 
			  		fill={color2} 
			  		fillOpacity={0.6}/>	                    
	        </RadarChart>
		)
	}

	/*
		{filters.map((filter, index)=> {
			color = this.getNextColor()
			return (
				<Radar key={index} name={getFilterName(filter)} 
					dataKey={getFilterName(filter)} 
					stroke={color}
					fill={color} fillOpacity={0.6}/>
			)
		})}
	*/

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
		console.log("Graph comp", this.props)
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