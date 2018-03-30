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
import { changeScreen, screens } from '../../actions/root'
const styles = theme => ({
  root: {
    flexGrow: 1,
    width : '99%',
    
  },
    root1: {
    height: '265px',
    backgroundColor: theme.palette.secondary.main,
    margin: '0 auto',
    overflow: 'auto',
    paddingBottom: 15,
  },
   root2: {
    height: '305px',
    backgroundColor: theme.palette.secondary.main,
    margin: '0 auto',
    overflow: 'auto',
    paddingBottom: 15,
  },
  text:{
    color:theme.palette.primary.main,
  },
});
 const mapStateToProps = (state) => ({
  screen: state.root.screen,
  id: state.root.id,
})
class StateGrid extends Component {

render() {
  const { classes } = this.props
  const { pp_data,ss_no,ex_curr,sport_d,top_marks,top_sport,top_extra_curr,t_s_a,t_s_s,t_s_e,p_c,p_b,p_g,districts} = this.props.state
 
  return (
    <div className={classes.root}>
          { p_c.map((d)=>{
           return <Typography style={{fontSize:'35px',textAlign:'center'}} >{d.name}</Typography>
})
}
     <Grid container style={{margin: 25, maxWidth: 'calc(100% - 50px)'}}>

          <Grid item xs={3}>
            <Progress data={p_b[0]} style={{marginBottom: 25}}/>
            </Grid>
          <Grid item xs={3}>
            <Progress data={p_g[0]} style={{marginBottom: 25}}/>
            </Grid>
            <Grid item xs={3}>
              <Progress data={t_s_a[0]} style={{marginBottom: 25}}/>
              </Grid>
              <Grid item xs={3}>
                <Progress data={p_c[0]} style={{marginBottom: 25}}/>
                </Grid>
                </Grid>
        <Grid container style={{margin: 25, maxWidth: 'calc(100% - 50px)'}}>
          <Grid item xs={5}>
          <Paper  style={{height:'350px'}}>
            <Typography style={{paddingTop:'10px',fontSize:'20px',textAlign:'center'}}>Districts List</Typography>
 <div className={classes.root2}>
                      <Table>
                      <TableBody>
                        { districts.map((d) => {
                       return <TableRow>
                          <TableCell onClick={() => {this.props.dispatch(changeScreen(screens.DISTRICT, d))}}>{d}</TableCell>
                      </TableRow>
             })
             }</TableBody></Table></div>
          </Paper>
          </Grid>
          <Grid item xs={7}>
          <Paper style={{height:'350px'}}>
            <Typography style={{paddingTop:'10px',fontSize:'20px',textAlign:'center'}}>All Districts Extra Curricular Performances</Typography>

          <GraphBar value={ex_curr}/>
            </Paper>
          
          </Grid>
            </Grid>

<Grid container style={{margin: 25, maxWidth: 'calc(100% - 50px)'}}>
          <Grid item xs={3}>
        
        <Progress data={t_s_s[0]} style={{marginBottom:'20px'}}/>
           
          <br/>

            
            <Progress data={t_s_e[0]} style={{}}/>
               
          </Grid>
          <Grid item xs={5}>
          <Paper style={{height:'270px'}}>
            <Typography style={{paddingTop:'10px',fontSize:'20px',textAlign:'center'}}>All Districts Academic Performances</Typography>

          <GraphBar value={pp_data}/>
            </Paper>
          
          </Grid>
          <Grid item xs={4}>
          <Paper style={{height:'270px'}}>
            <Typography style={{paddingTop:'10px',fontSize:'20px',textAlign:'center'}}>No Of Students Per District</Typography>

            <GraphLine value={ss_no}/>
            </Paper>
          </Grid>
              </Grid>

              <Grid container style={{margin: 25, maxWidth: 'calc(100% - 50px)'}}>
                        <Grid item xs={4}>
                      <Paper style={{height:'300px',textAlign:'center'}}>
                      <Typography style={{paddingTop:'10px',fontSize:'20px'}}>Top Academic Performances</Typography>
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
                          <Typography style={{paddingTop:'10px',fontSize:'20px',textAlign:'center'}}>State Sports Performances</Typography>
                            <br/>
                            <GraphLine value={sport_d}/>
                          </Paper>
                        </Grid>
                        <Grid item xs={4}>
                        <Paper style={{height:'300px'}}>
                      <Typography style={{paddingTop:'10px',fontSize:'20px',textAlign:'center'}}>Top Extra Curricular Performances</Typography>
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



export default withStyles(styles)(StateGrid);
