import React, { Component } from 'react'
import CssBaseline from 'material-ui/CssBaseline';
import {VictoryBar, VictoryChart, VictoryGroup, VictoryTheme, VictoryLine} from 'victory'

export default class FifaGraph extends Component{
  render(){
    let style = {
      'paddingTop': 5
    }

    return (
      <div style={style}>
       <div>
  <VictoryChart
    theme={VictoryTheme.material}
  >
    <VictoryArea data={sampleData}/>
    <VictoryAxis/>
  </VictoryChart>
  <VictoryChart polar
    theme={VictoryTheme.material}
  >
    <VictoryArea data={sampleData}/>
    <VictoryPolarAxis/>
  </VictoryChart>
</div>
        
        <h3>{this.props.value}</h3>
      </div>
    )
  }
}
