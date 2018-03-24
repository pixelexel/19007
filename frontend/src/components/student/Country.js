import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import GraphBar from './GraphBar'
import GraphLine from './GraphLine'
import GraphComponent from './GraphComponent'
import List from './List.js'
import Chips from './Chips'
import FaceIcon from 'material-ui-icons/Face'
import MoodIcon from 'material-ui-icons/Mood'
import AssIcon from 'material-ui-icons/Assessment'
import WorldIcon from 'material-ui-icons/Language'
import { ListItem, ListItemText, ListSubheader } from 'material-ui/List'
import { addGraph, getAllGraphs, removeGraph } from '../../actions/graph'
import { addList, getAllLists, removeList } from '../../actions/list'
import {BarChart,XAxis,YAxis,CartesianGrid,Tooltip,Legend,Bar,ResponsiveContainer} from 'recharts'
const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '99%',
  },
 
});


class CountryGrid extends Component {

render() {
  const { classes } = this.props
  const { pp_data,no_ss,ex_curr,sports_data,acad_list,sports_list} = this.props.country

  return (
    <div className={classes.root}>
      <br/>
      <Grid container spacing={24}>
         <Grid item xs={3} style={{}}>
        <Paper style={{background:'#E6004C',marginLeft: '10px',height:'90%'}}>
          <h2 style={{color:'black'}}>Scholars</h2>
                <FaceIcon style={{fontSize:'100px',marginTop:'0px'}}/>
          
        </Paper>
        </Grid>
        <Grid item xs={3} >
        <Paper style={{background:'#ff9900',marginLeft: '10px',height:'90%'}}>
            <h2 style={{color:'black'}}>Students</h2>
          <MoodIcon style={{fontSize:'100px',marginTop:'0px'}}/>
        </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper style={{background:'#B300B3',marginLeft: '10px',height:'90%'}}>
              <h2 style={{color:'black'}}>Percentage</h2>
          <AssIcon style={{fontSize:'100px',marginTop:'0px'}}/>

          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper style={{background:'#00E6E6',marginLeft: '10px',height:'90%'}}>

              <h2 style={{color:'black'}}>India</h2>
          <WorldIcon style={{fontSize:'100px',marginTop:'0px'}}/>

          </Paper>
        </Grid>

      </Grid>
      <br/>
        <br/>
      <Grid container spacing={24}>
        <Grid item xs={6}>
        <header style={{marginLeft:'1.5%',backgroundColor:'#990099', height:'40px', color:'#FFFFFF', fontSize:'30px', paddingLeft:'3%'}}>
           New Orders
          </header>
        <Paper  style={{height:'250px',marginLeft: '10px',}}>
        <GraphLine value={pp_data} />
        </Paper>
        </Grid>
        <Grid item xs={6}>
        <header style={{marginLeft:'1.5%',backgroundColor:'#00CCCC', height:'40px', color:'#FFFFFF', fontSize:'30px', paddingLeft:'3%'}}>
           Montly Sales
          </header>
          <Paper style={{height:'250px',marginLeft: '10px',}}>
        <GraphBar value={pp_data} />
          
          </Paper>
        </Grid>
      </Grid>
      <br />
      <br />
    
      <Grid container spacing={24}>
        <Grid item xs={4}>
        <header style={{marginLeft:'2%',backgroundColor:'#00CCCC', height:'40px', color:'#FFFFFF', fontSize:'30px', paddingLeft:'3%'}}>
          Recent Lists
          </header>
          <Paper style={{height:'300px',marginLeft: '10px',}}>
             { pp_data.map((d) => {
              return <ListItem>
                        <ListItemText primary={d.State} style={{textAlign:'left', fontSize:'50px'}}/>
                        <ListItemText primary={d.percentage} style={{textAlign:'right', fontSize:'50px'}}/>
                      </ListItem>
             })
             }
          </Paper>
        </Grid>
        <Grid item xs={4}>
         <header style={{marginLeft:'2%',backgroundColor:'#990099', height:'40px', color:'#FFFFFF', fontSize:'30px', paddingLeft:'3%'}}>
           Browser Usage
          </header>
          <Paper style={{height:'300px',marginLeft: '10px',}}>
             { pp_data.map((d) => {
              return <ListItem>
                        <ListItemText primary={d.State} style={{textAlign:'left', fontSize:'50px'}}/>
                        <ListItemText primary={d.percentage} style={{textAlign:'right', fontSize:'50px'}}/>
                      </ListItem>
             })
             }
          </Paper>
        </Grid>
        <Grid item xs={4}>
        <header style={{marginLeft:'2%',backgroundColor:'#00CCCC', height:'40px', color:'#FFFFFF', fontSize:'30px', paddingLeft:'3%'}}>
          Recent Lists
          </header>
          <Paper style={{height:'300px',marginLeft: '10px',}}>
             { pp_data.map((d) => {
              return <ListItem>
                        <ListItemText primary={d.State} style={{textAlign:'left', fontSize:'50px'}}/>
                        <ListItemText primary={d.percentage} style={{textAlign:'right', fontSize:'50px'}}/>
                      </ListItem>
             })
             }
           
          </Paper>
        </Grid>
        
      </Grid>
    </div>
  )
}
}



export default withStyles(styles)(CountryGrid);
