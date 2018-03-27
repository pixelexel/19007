import React, { Component } from 'react'
import { Select, FormControl, InputLabel, MenuItem } from 'material-ui'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
    }
})

class SelectInput extends Component{
    render(){
        const { id, name, value, options, label, classes } = this.props
        console.log('SELECT INP', this.props)
        return (
        <FormControl style={this.props.style} className={classes.formControl}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Select
                value={value}
                onChange={this.props.onChange}
                inputProps={{
                    name: name,
                    id: id,
                }}
            >
            {options.map(option => (
                <MenuItem key={option.value} value={option.value}> {option.name} </MenuItem>
            ))}
            </Select>
        </FormControl>)
    }
}

export default withStyles(styles)(SelectInput)