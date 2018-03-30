import React, { Component } from 'react'
import CssBaseline from 'material-ui/CssBaseline';
import {VictoryBar, VictoryChart, VictoryGroup, VictoryTheme, VictoryLine} from 'victory'
import { ResponsiveContainer, BarChart,Bar,LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts'
import { withStyles } from 'material-ui/styles' 
import '../../styles/graph.scss'
import convert from 'color-convert'
 
const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText + ' !important',
  }
})

class GraphBar extends Component{
	render () {
    const { classes, theme } = this.props
  	return (
      <div>
      <ResponsiveContainer width="100%" aspect={3.0/1.2}>
    	<BarChart width={600} height={300} data={this.props.value}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="value" fill={theme.palette.primary.main} />
      </BarChart>
      </ResponsiveContainer>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(GraphBar)
