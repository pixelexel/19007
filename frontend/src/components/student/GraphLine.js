import React, { Component } from 'react'
import CssBaseline from 'material-ui/CssBaseline';
import {VictoryBar, VictoryChart, VictoryGroup, VictoryTheme, VictoryLine} from 'victory'
import { withStyles } from 'material-ui/styles' 
import '../../styles/graph.scss'
import convert from 'color-convert'

import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts'
export default class GraphLine extends Component{
  render(){
    return (
      <div >
      <ResponsiveContainer width="100%" aspect={3.0/1.5}>
        <LineChart data={this.props.value}
            margin={{top: 20, right: 30, left: -10, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="value" stroke="#FFC200" activeDot={{r: 8}}/>
      </LineChart>
    </ResponsiveContainer>
      </div>
    )
  }
}