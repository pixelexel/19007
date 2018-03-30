import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import GraphBar from './GraphBar'
import GraphLine from './GraphLine'
import GraphComponent from '../GraphComponent'
import List from './List.js'
import Chips from './Chips'
import { Table, TableBody, TableCell, TableHead, TableRow } from 'material-ui'
import FaceIcon from 'material-ui-icons/Face'
import MoodIcon from 'material-ui-icons/Mood'
import AssIcon from 'material-ui-icons/Assessment'
import WorldIcon from 'material-ui-icons/Language'
import Typography from 'material-ui/Typography';
import Progress from '../Progress'
import { ListItem, ListItemText, ListSubheader } from 'material-ui/List'
import { addGraph, getAllGraphs, removeGraph } from '../../actions/graph'
import { addList, getAllLists, removeList } from '../../actions/list'
import {BarChart,XAxis,YAxis,CartesianGrid,Tooltip,Legend,Bar,ResponsiveContainer} from 'recharts'
import IndiaState from '../../test_map/indiaState'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '99%',
  },
  root1: {
    height: '265px',
    backgroundColor: theme.palette.secondary.main,
    margin: '0 auto',
    overflow: 'auto',
    paddingBottom: 15,
  },
 
});

class CountryGrid extends Component {
constructor(props){
  super(props)
}

render() {
  const { classes,theme } = this.props
  const { pp_data,ss_no,ex_curr,sport_d,top_marks,top_sport,top_extra_curr,t_s_a,t_s_s,t_s_e,p_c,p_b,p_g} = this.props.country
  return (
    <div className={classes.root}>
     <Grid container style={{margin: 25, maxWidth: 'calc(100% - 50px)'}}>
      <Grid item xs={6}>
        <IndiaState dispatch={this.props.dispatch}/>
      </Grid>
      <Grid item xs={6}>
        <Grid container>
          <Grid item xs={6}>
            <Progress data={p_c[0]} style={{marginBottom: 25}}/>
          </Grid>
          <Grid item xs={6}>
            <Progress data={p_b[0]} style={{marginBottom: 25}}/>
          </Grid>
          <Grid item xs={6}>
            <Progress data={p_g[0]} style={{marginBottom: 25}}/>
          </Grid>
          <Grid item xs={6}>
          <Paper style={{height:'inherit'}}>
            <Typography style={{fontSize:'10px',textAlign:'center',marginBottom:'-10px'}}>Best Academic Performance</Typography>
            <Progress data={t_s_a[0]} style={{marginBottom: 25}}/>
          </Paper>
          </Grid>
            <Grid item xs={6}>
            <Paper style={{height:'inherit'}}>
            <Typography style={{fontSize:'10px',textAlign:'center',marginBottom:'-10px'}}>Best Sports Performance</Typography>
            <Progress data={t_s_s[0]} style={{marginBottom: 25}}/>
          </Paper>         
             </Grid>
            <Grid item xs={6}>
              <Progress data={t_s_e[0]} style={{ marginBottom: 25 }} />
            </Grid>
            <Grid item xs={6}>
              <Progress data={pp_data[2]} style={{ marginBottom: 25 }} />
            </Grid>
            <Grid item xs={6}>
              <Progress data={pp_data[3]} style={{ marginBottom: 25 }} />
            </Grid>
        </Grid>
      </Grid>
    </Grid>
        <Grid container style={{margin: 25, maxWidth: 'calc(100% - 50px)'}}>
          <Grid item xs={5}>
          <Paper  style={{height:'350px'}}>
            <Typography style={{fontSize:'25px',textAlign:'center'}}>All States Academic Performances</Typography>

             <GraphLine value={pp_data}/>
          </Paper>
          </Grid>
          <Grid item xs={7}>
          <Paper style={{height:'350px'}}>
            <Typography style={{fontSize:'25px',textAlign:'center'}}>All States Extra Curricular Performances</Typography>

          <GraphBar value={ex_curr}/>
            </Paper>
          
          </Grid>
            </Grid>

<Grid container style={{margin: 25, maxWidth: 'calc(100% - 50px)'}}>
          <Grid item xs={3}>
        
        <Progress data={pp_data[1]} style={{marginBottom:'20px'}}/>
           
          <br/>

            
            <Progress data={pp_data[1]} style={{}}/>
               
          </Grid>
          <Grid item xs={5}>
          <Paper style={{height:'270px'}}>
            <Typography style={{fontSize:'25px',textAlign:'center'}}>All States Academic Performances</Typography>

          <GraphBar value={pp_data}/>
            </Paper>
          
          </Grid>
          <Grid item xs={4}>
          <Paper style={{height:'270px'}}>
            <Typography style={{fontSize:'25px',textAlign:'center'}}>No Of Students Per State</Typography>

            <GraphLine value={ss_no}/>
            </Paper>
          </Grid>
              </Grid>

              <Grid container style={{margin: 25, maxWidth: 'calc(100% - 50px)'}}>
                        <Grid item xs={4}>
                      <Paper style={{height:'300px',textAlign:'center'}}>
                      <Typography style={{fontSize:'25px'}}>Top Academic Performances</Typography>
                      <div className={classes.root1}>
                      <Table>
                      <TableBody>
                        { top_marks.map((d) => {
                       return <TableRow>
                          <TableCell>{d.name}</TableCell>
                          <TableCell style={{textAlign:'right'}}>{d.marks}</TableCell>
                      </TableRow>
             })
             }</TableBody></Table></div>
                          </Paper>
                        </Grid>
                        <Grid item xs={4}>
                        <Paper style={{height:'300px'}}>
                          <Typography style={{fontSize:'25px',textAlign:'center'}}>All States Sports Performances</Typography>
                            <br/>
                            <GraphLine value={sport_d}/>
                          </Paper>
                        </Grid>
                        <Grid item xs={4}>
                        <Paper style={{height:'300px'}}>
                      <Typography style={{fontSize:'25px',textAlign:'center'}}>Top Extra Curricular Performances</Typography>
                        <div className={classes.root1}>
                      <Table>
                      <TableBody>
                        { top_extra_curr.map((d) => {
                       return <TableRow>
                          <TableCell>{d.name}</TableCell>
                          <TableCell style={{textAlign:'right'}}>{d.extra_curr}</TableCell>
                      </TableRow>
             })
             }</TableBody></Table></div>
                          </Paper>
                        </Grid>
                            </Grid>
    </div>
  )
}
}



export default withStyles(styles)(CountryGrid);
