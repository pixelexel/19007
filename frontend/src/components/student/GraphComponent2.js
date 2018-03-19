import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { RadarChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, ResponsiveContainer, Radar } from 'recharts';
export default class GraphComponent2 extends Component{
  render(){
    return (
      <div >
      <ResponsiveContainer width="100%" aspect={3.0/3.0}>
        <RadarChart 
          cx={200} 
          cy={200} 
          outerRadius={150} 
          width={400} 
          height={350} 
          marginTop={100}
          data={this.props.value}

        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis/>
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
        </RadarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}