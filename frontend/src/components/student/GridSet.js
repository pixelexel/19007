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
    width: '99%',
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


class AutoGrid extends Component {

render() {
  const { classes } = this.props
  const { data, acad_data, sport_data, c_data, d_data} = this.props.student

  return (
    <div className={classes.root}>
      <br/>
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
