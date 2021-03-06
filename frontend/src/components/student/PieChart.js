import {PieChart, Pie, Legend, Tooltip, ResponsiveContainer} from  'recharts'
import React, { Component } from 'react'
import CssBaseline from 'material-ui/CssBaseline';
import { withStyles } from 'material-ui/styles' 
import '../../styles/graph.scss'
import convert from 'color-convert'
 
const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText + ' !important',
  }
})

const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
                  {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

class PieChartGraph extends Component{
	render () {
    const { classes, theme } = this.props
  	return (
      <div height="100%">
      <ResponsiveContainer width="100%" height="1000%">
		<PieChart margin={{ top: 25, right: 25, left: 20, bottom: 25 }}>
			<Pie isAnimationActive={false} data={data01} outerRadius={60} fill={theme.palette.primary.main} label/>
        <Tooltip/>
       </PieChart>
      </ResponsiveContainer>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(PieChartGraph)
