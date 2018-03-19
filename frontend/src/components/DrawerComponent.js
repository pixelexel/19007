import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    drawer: state.drawer,
    screen: state.root.screen,

  }
}

const styles = theme => ({

})

class DrawerComponent extends Component{
  render(){

    return 
    (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </Drawer>
    )
  }
}

export default withStyles(styles)(connect(mapStateToProps)(DrawerComponent))