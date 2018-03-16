import React, { Component } from 'react'
import { ResponsiveContainer, Label, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'

const style = {
	width: '100%',
	height: '100%',
	fontWeight: 'normal',
	margin:'0 auto',
	position: 'relative',
}
export default class GraphComponent extends Component{
	render(){
		let {x, y, filters, data, name} = this.props.data

		return(
			<div style={style}>
			<ResponsiveContainer width='90%' height="80%">
				<LineChart data={data} margin={{ top: 5, right: 5, left: 30, bottom: 25 }}>
				  <CartesianGrid strokeDasharray="3 3" />
				  <XAxis dataKey={x}>
				  	<Label value={x} offset={-10} position="insideBottom" />
				  </XAxis>
				  <YAxis />
				  <Tooltip />
				  <Legend verticalAlign="top" height={36}/>
				  <Line type="monotone" dataKey={y} stroke="#8884d8" />
				  { filters.map(filter => (
				  		<Line key={filter.name + filter.op + filter.val} type="monotone" dataKey={`${filter.name} ${filter.op} ${filter.val}`} stroke="#82ca9d" />
				  
				  ))}
				  
				</LineChart>
			</ResponsiveContainer>
			</div>
			
		)
	}
}