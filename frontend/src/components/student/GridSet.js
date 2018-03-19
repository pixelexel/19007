import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import GraphComponent2 from './GraphComponent2'
import GraphComponent from './GraphComponent'
import List from './List.js'
import Chips from './Chips'
import {BarChart,XAxis,YAxis,CartesianGrid,Tooltip,Legend,Bar,ResponsiveContainer} from 'recharts'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  cardstyle: {
    width: '100%',
    height: '100%',
  },
  profileimagestyle: {
    width: '50%',
    height: '50%',
    marginTop: '5%',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    minHeight: '400px',
    marginLeft: '10px',
    height: '100% !important',
    color: theme.palette.text.secondary,
  },
});

const data = [
    { subject: 'Math', A: 120, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
    { subject: 'History', A: 65, B: 85, fullMark: 150 },
];
const  acad_data  = [{name: '2010', uv: 3400, amt: 2400},
      {name: '2011', uv: 2700, amt: 2210},
      {name: '2012', uv: 1600, amt: 2290},
      {name: '2013', uv: 2780, amt: 2000},
      {name: '2014', uv: 2790, amt: 2181},
      {name: '2015', uv: 3790, amt: 2500},
];
const  sport_data  = [{name: '2010', uv: 4000, amt: 2400},
      {name: '2011', uv: 3000, amt: 2210},
      {name: '2012', uv: 2000, amt: 2290},
      {name: '2013', uv: 2780, amt: 2000},
      {name: '2014', uv: 1890, amt: 2181},
      {name: '2015', uv: 2390, amt: 2500},
];
const  c_data  = [{name: '2010', uv: 2000, amt: 2400},
      {name: '2011', uv: 3200, amt: 2210},
      {name: '2012', uv: 4000, amt: 2290},
      {name: '2013', uv: 5480, amt: 2000},
      {name: '2014', uv: 3190, amt: 2181},
      {name: '2015', uv: 1290, amt: 2500},
];
const  d_data  = [{name: '2010', uv: 3600, amt: 2400},
      {name: '2011', uv: 6000, amt: 2210},
      {name: '2012', uv: 4000, amt: 2290},
      {name: '2013', uv: 1980, amt: 2000},
      {name: '2014', uv: 3990, amt: 2181},
      {name: '2015', uv: 2990, amt: 2500},
];

const rank_data = [
      {name: 'Page A', uv: 2, pv: 8},
  
];

class AutoGrid extends Component {

render() {
  const { classes } = this.props;
  return (
    <div className={classes.root}>
      <br />
      <Grid container spacing={24}>
        <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Card className={classes.cardstyle}>
                <img className={ classes.profileimagestyle } src={"http://vfsglobal.herokuapp.com/static/media/doc3.svg"}  />
                <h2>Name: Amit Ghetia</h2>
                <h1>Score: 8</h1>
              </Card> 
            </Grid>
            <Grid item xs={6}>
              <Card>
                <br />
                <h2>Class: 3</h2>
                <h2>School: Greenlawns High School</h2>
                <br />
              </Card>
              <Card>
                <br />
                <h2>District: Mumbai</h2>
                <h2>State: Maharashtra</h2>
                <br />
              </Card>
              <Card>
                <br />
                <h2>Country: India</h2>
                <br />
              </Card>
            </Grid>
          </Grid>
        </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <GraphComponent2 value={data}/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <List />
          </Paper>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={24}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <GraphComponent value={acad_data}/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <GraphComponent value={sport_data} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <GraphComponent value={c_data}/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <GraphComponent value={d_data} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
}



export default withStyles(styles)(AutoGrid);
