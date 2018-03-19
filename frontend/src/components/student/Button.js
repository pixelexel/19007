import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,

  },
  input: {
    display: 'none',
  },
  pad: {
    'paddingLeft':200,
  },
});

function RaisedButtons(props) {
  const { classes } = props;
  return (
    <div className={classes.pad}>
      <Button style={{ fontSize: '30px',background:'#1E96FF' }} variant="raised" color="primary"  className={classes.button} >
        Country
      </Button>
      <Button style={{ fontSize: '30px',background:'#42CCFF' }} variant="raised" color="secondary" className={classes.button}>
        State
      </Button>
      <Button style={{ fontSize: '30px',background:'#0081F2' }} variant="raised" color="primary" className={classes.button}>
        District
      </Button>

        <Button style={{ fontSize: '30px',background:'#56D2FF' }} variant="raised" color="secondary" className={classes.button}>
          School
        </Button>

    </div>
  );
}

RaisedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RaisedButtons);
