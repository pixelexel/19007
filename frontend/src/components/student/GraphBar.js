import React, { Component } from 'react'
import CssBaseline from 'material-ui/CssBaseline';
import {VictoryBar, VictoryChart, VictoryGroup, VictoryTheme, VictoryLine} from 'victory'
import { ResponsiveContainer, BarChart,Bar,LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts'
export default class GraphBar extends Component{

	render () {
  	return (
      <div>
      <ResponsiveContainer width="100%" aspect={3.0/1.0}>
    	<BarChart width={600} height={300} data={this.props.value}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="State"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="percentage" fill="#8884d8" />
      </BarChart>
      </ResponsiveContainer>
      </div>

    );
  }
}