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
});
const mapStateToProps = (state) => ({
  screen: state.root.screen,
  id: state.root.id,
})  
class SchoolGrid extends Component {

render() {
  const { classes } = this.props
  const {p_marks,p_sport,top_extra_curr,b_marks,g_marks,avg_marks,avg_sport,avg_extra_curr,p_c,p_b,p_g,students} = this.props.school
  return (
    <div className={classes.root}>
      <Grid container style={{margin: 25, maxWidth: 'calc(100% - 50px)'}}>

          <Grid item xs={3}>
            <Progress data={p_b[0]} style={{marginBottom: 25}}/>
            </Grid>
          <Grid item xs={3}>
            <Progress data={p_g[0]} style={{marginBottom: 25}}/>
            </Grid>
            <Grid item xs={3}>
              <Progress data={avg_marks[0]} style={{marginBottom: 25}}/>
              </Grid>
              <Grid item xs={3}>
                <Progress data={p_c[0]} style={{marginBottom: 25}}/>
                </Grid>
                </Grid>
        <Grid container style={{margin: 25, maxWidth: 'calc(100% - 50px)'}}>
          <Grid item xs={5}>
          <Paper  style={{height:'350px'}}>
            <Typography style={{paddingTop:'10px',fontSize:'20px',textAlign:'center'}}>School Academic Performances</Typography>
 <div className={classes.root2}>
                      <Table>
                      <TableBody>
                        { students.map((d) => {
                       return <TableRow>
                          <TableCell onClick={() => {this.props.dispatch(changeScreen(screens.STUDENT, d.value))}}>{d.name}</TableCell>
                      </TableRow>
             })
             }</TableBody></Table></div>
          </Paper>
          </Grid>
          <Grid item xs={7}>
          <Paper style={{height:'350px'}}>
            <Typography style={{paddingTop:'10px',fontSize:'20px',textAlign:'center'}}>School Sports Performances</Typography>

          <GraphBar value={p_sport}/>
            </Paper>
          
          </Grid>
            </Grid>

<Grid container style={{margin: 25, maxWidth: 'calc(100% - 50px)'}}>
          <Grid item xs={3}>
        
        <Progress data={avg_sport[0]} style={{marginBottom:'20px'}}/>
           
          <br/>

            
            <Progress data={avg_extra_curr[0]} style={{}}/>
               
          </Grid>
          <Grid item xs={5}>
          <Paper style={{height:'270px'}}>
            <Typography style={{paddingTop:'10px',fontSize:'20px',textAlign:'center'}}>School Extra Curricular Performances</Typography>

          <GraphBar value={top_extra_curr}/>
            </Paper>
          
          </Grid>
          <Grid item xs={4}>
          <Paper style={{height:'270px'}}>
            <Typography style={{paddingTop:'10px',fontSize:'20px',textAlign:'center'}}>Boys Academic Performances</Typography>

            <GraphLine value={b_marks}/>
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
                        { p_marks.map((d) => {
                       return <TableRow>
                          <TableCell>{d.name}</TableCell>
                          <TableCell style={{textAlign:'right'}}>{d.value}</TableCell>
                      </TableRow>
             })
             }</TableBody></Table></div>
                          </Paper>
                        </Grid>
                        <Grid item xs={4}>
                        <Paper style={{height:'300px'}}>
                          <Typography style={{paddingTop:'10px',fontSize:'20px',textAlign:'center'}}>Girls Academic Performances</Typography>
                            <br/>
                            <GraphLine value={g_marks}/>
                          </Paper>
                        </Grid>
                        <Grid item xs={4}>
                        <Paper style={{height:'300px'}}>
                      <Typography style={{paddingTop:'10px',fontSize:'20px',textAlign:'center'}}>Top Sports Performances</Typography>
                        <div className={classes.root1}>
                      <Table>
                      <TableBody>
                        { p_sport.map((d) => {
                       return <TableRow>
                          <TableCell>{d.name}</TableCell>
                          <TableCell style={{textAlign:'right'}}>{d.value}</TableCell>
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



export default withStyles(styles)(SchoolGrid);
