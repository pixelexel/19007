import React, { Component } from 'react'
import CssBaseline from 'material-ui/CssBaseline';
import {VictoryBar, VictoryChart, VictoryGroup, VictoryTheme, VictoryLine} from 'victory'
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts'
export default class GraphComponent extends Component{
  render(){
    return (
      <div >
      <ResponsiveContainer width="100%" aspect={1.0/1.0}>
        <LineChart data={this.props.value}
            margin={{top: 5, right: 30, left: -10, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{r: 8}}/>
      </LineChart>
    </ResponsiveContainer>
      </div>
    )
  }
}