import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleDrawer, changeScreen, screens } from '../actions/root'
import { IconButton, Drawer, List, ListItem, ListItemText, ListSubheader, Divider,  } from 'material-ui'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import { withStyles } from 'material-ui/styles'
import { toTitleCase } from '../utils'

const mapStateToProps = state => {
  return {
    drawer: state.root.drawer,
    screen: state.root.screen,
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

  handleScreenChange = (screen) => {
    this.props.dispatch(changeScreen(screen))
  }

  render(){
    console.log('drawer', this.props)
    const { open } = this.props.drawer
    const { screen, classes } = this.props
    let screenArr = Object.keys(screens)

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
            component="div">Screens</ListSubheader>}
        >
        {
          screenArr.map(screen => (
            <ListItem button key={screen} onClick={this.handleScreenChange.bind(this, screens[screen])}>
              <ListItemText primary={toTitleCase(screen)}/>
            </ListItem>
          ))        
        }
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles)(connect(mapStateToProps)(DrawerComponent))