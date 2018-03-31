import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleDrawer, changeScreen, screens } from '../actions/root'
import { getDrawerData } from '../actions/drawer'
import { IconButton, Drawer, List, ListItem, ListItemText, ListSubheader, Divider, Grid } from 'material-ui'
import EditIcon from 'material-ui-icons/Edit'
import AddIcon from 'material-ui-icons/Add'
import DeleteIcon from 'material-ui-icons/Delete'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import { withStyles } from 'material-ui/styles'
import { toTitleCase } from '../utils'
import { Link } from 'react-router-dom'

const mapStateToProps = state => {
  return {
    drawer: state.root.drawer,
    screen: state.root.screen,
    data: state.drawer,
  }
}

const styles = theme => ({
  drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      backgroundColor: theme.palette.secondary.main,
      ...theme.mixins.toolbar,
    },
    paper: {
      minWidth: 300,
    },
    subheader: {
      textAlign: 'left',
    }

})

class DrawerComponent extends Component{
  handleDrawerClose = () => {
    this.props.dispatch(toggleDrawer())
  }

  handleScreenChange = (screen, id, name) => {
    if(name)
      this.props.dispatch(changeScreen(screen, id, {'name': name}))
    else 
      this.props.dispatch(changeScreen(screen, id))
  }

  componentWillMount(){
    this.props.dispatch(getDrawerData())
  }

  render(){
    console.log('drawer', this.props)
    const { open } = this.props.drawer
    const { screen, data, classes } = this.props
    const { fetching, dashboards, custom_filters } = this.props.data

    return (
      <Drawer
        variant="persistent"
        anchor='left'
        open={open}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List className={classes.paper}
          subheader={<ListSubheader 
            className={classes.subheader} 
            component="div">Dashboards</ListSubheader>}
        >
          <ListItem button key='global'
            id={`${screens.COUNTRY}-0`}
            >
            { /*             onClick={this.handleScreenChange.bind(this, screens.COUNTRY, 0)}
*/
                /* <ListItemText primary="Global Dashboard"/> */}
             <Link to={'/'}>Global Dashboard</Link>
          </ListItem>

          {
            dashboards.map ( (d, index) => (
              <ListItem button key={index}
                 >
                <Link to={`/dash/${d.id}`}>{d.name}</Link>
                {/* <IconButton style={{ height: 26 }}>
                  <DeleteIcon />
                </IconButton> */}
              </ListItem>
              ))
          }
          {/* <ListItem button key={'add'}
            onClick={this.handleScreenChange.bind(this, screens.DASH, null)} >
            <ListItemText primary={'Add a new dashboard'} />
            <IconButton style={{ height: 26 }}>
                <AddIcon/>
            </IconButton>
          </ListItem> */}
          <ListItem button key={'add'}>
            <Link to={`/dash/${null}`}>Add a new dashboard</Link>
          </ListItem>
        </List>
        <List className={classes.paper}
          subheader={<ListSubheader
            className={classes.subheader}
            component="div">Custom Filters</ListSubheader>}
            >
            {
              custom_filters.map((f, index) => (
              <ListItem button key={index} id={`${screens.ADD_FILTER}-${f.id}`}
                onClick={this.handleScreenChange.bind(this, screens.ADD_FILTER, f.id)} >
                <ListItemText primary={f.name}/>
              </ListItem>
            ) )}
          </List>
      </Drawer>
    )
  }
}

export default withStyles(styles)(connect(mapStateToProps)(DrawerComponent))