import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import classNames from 'classnames';
import List,{ ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';



const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,

  },

  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -15,
  },

    appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
        zIndex:1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
    drawerPaper: {
    position: 'absolute',
    width: drawerWidth,
  },
 drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
    content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },

  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },

});


class ButtonAppBar extends Component {
  state = {
    open: false,
  };
   handleDrawerOpen = () => {
       if (this.state.open === false)
       this.setState({open: true});
       else{
    this.setState({ open: false });
        }
   };
    handleDrawerClose = () => {
    this.setState({ open: false });
  };s



    render() {
        const {classes, theme} = this.props;
        const { anchor, open } = this.state;
        const drawer = (
      <Drawer
        variant="persistent"
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

       <List>
        <ListItem button>
          <ListItemText primary="Country" />
        </ListItem>
        <ListItem button>

          <ListItemText primary="State" />
        </ListItem>
         <ListItem button>

          <ListItemText primary="District" />
        </ListItem>
           <ListItem button>

          <ListItemText primary="School" />
        </ListItem>
      </List>
      </Drawer>
    );
          let before = drawer;



        return (
            <div className={classes.root}>

                <AppBar className={classNames( {
              [classes.appBarShift]: open,
              [classes[`appBarShift-left`]]: open,
            })} position="static">

                    <Toolbar>
                        <IconButton className={classNames(classes.menuButton, open)} color="inherit" aria-label="open drawer"
                  onClick={this.handleDrawerOpen}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Student Analysis Platform
                        </Typography>
                        <Button color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
              {before}

            </div>
        );
    }


}
ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles)(ButtonAppBar);