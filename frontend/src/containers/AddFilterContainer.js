import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { Card, CardHeader, CardContent, Grid, FormControl, Input, TextField } from 'material-ui'
import { getFormVals, formValTypes } from '../actions/popup'
import SelectInput from '../components/Select'

const mapStateToProps = state => ({
     formVals: state.popup.list.formVals.filters,
})

const styles = theme => ({
    formControl: {
        minWidth: 150,
        margin: theme.spacing.unit,
    }
})

class AddFilterContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            fname: '',
            ftype: formValTypes.int,
            fdefault: 0,
            fselected: [],
        }
    }

    handleOnChange = (e) => {
        const conv = {
            'int': 0,
            'string': '',
            'bool': 'True',
            'date': '2014-01-01',
        }
        
        const d = {}
        console.log('change', e.target.id, e.target.name)
        d[e.target.name] = e.target.value
        if(e.target.name == 'ftype') d['fdefault'] = conv[e.target.value]
        this.setState(d)
    }

    componentWillMount(){
        this.props.dispatch(getFormVals())
    }

    render(){
        const { fname, ftype, fdefault, fselected } = this.state 
        const { classes } = this.props 
        console.log('ADD FILTER', this.state)
        const convToType = {
            'int': 'number',
            'string': 'text',
            'bool': 'text',
            'date': 'text'
        }

        return (
        <div>
            <Grid container>
                <Card>
                    <CardHeader title="Add a filter"/>
                    <CardContent>
                        <FormControl className={classes.formControl}>
                            <TextField id="fname"
                                label="Filter Name"
                                value={fname}
                                name="fname"
                                onChange={this.handleOnChange}
                                />
                        </FormControl>
                        <SelectInput
                            style={{minWidth: 150}}
                            label="Filter Type"
                            onChange={this.handleOnChange}
                            options={Object.keys(formValTypes).map(v => ({ 
                                value: v,
                                name: v,
                            }))}
                            id="ftype"
                            name="ftype"
                            value={ftype}/>
                        <FormControl className={classes.formControl}>
                            <TextField 
                            name="fdefault"
                            label="Default value"
                            type={convToType[ftype]}
                            value={fdefault}
                            onChange={this.handleOnChange}
                            />
                        </FormControl>
                    </CardContent>
                </Card>
            </Grid>
        </div>)
    }
}

export default withStyles(styles)(connect(mapStateToProps)(AddFilterContainer))