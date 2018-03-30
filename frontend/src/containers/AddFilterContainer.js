import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { Card, CardHeader, CardContent, Grid, FormControl, Input, TextField } from 'material-ui'
import { getFormVals, formValTypes } from '../actions/popup'
import SelectInput from '../components/Select'
import SearchPure from '../components/SearchPure'
import { updateListForm } from '../actions/popup'
import FilterAdder from '../components/FilterAdder'
import StudentTable from '../components/StudentTable'
import { CircularProgress } from 'material-ui/Progress';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography'
import { getListFromFilters, addToTable, updateTable, saveNewFilter, deleteFromTable } from '../actions/addfilter'

const mapStateToProps = state => ({
     formVals: state.popup.list.formVals,
     filters: state.popup.list.filters,
     data: state.addfilter.data,
     meta: state.addfilter.meta,
     saving: state.addfilter.saving,
})

const styles = theme => ({
    formControl: {
        minWidth: 150,
        margin: theme.spacing.unit,
    },
    grid:{
        position: 'relative',
        margin: '0 auto',
        marginTop: 20,
        width: 'calc(100% - 40px)',
    },
    blur: {
        pointerEvents: 'none',
        filter: 'blur(4px)',
    },
    modal: {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        textAlign: 'center',
    },
    progress:{
        position: 'relative',
        margin: '0 auto',
        display: 'inline-block',
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
            saving: false,
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
        if(this.props.id){
            if (!this.props.meta.fset){
                //dispatch api action
            }
            else{
                // set the state
            }
        }
        this.props.dispatch(getFormVals())
    }

    render(){
        const { fname, ftype, fdefault, fselected } = this.state 
        const { classes, formVals, filters, theme, data, saving } = this.props

        console.log('ADD FILTER', this.state, this.props)
        const convToType = {
            'int': 'number',
            'string': 'text',
            'bool': 'text',
            'date': 'text'
        }

        return (
        <div>
            <Modal open={saving}>
                <div className={classes.modal}>
                    <Typography style={{fontSize: 24, marginBottom: 16}}>
                        Saving
                    </Typography>
                    <CircularProgress size={70} className={classes.progress}/>
                </div>
            </Modal>
            <div className={(saving ? classes.blur : '')}>
                <Grid container className={classes.grid}>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader title="Select Students"/>
                            <CardContent>
                                <SearchPure 
                                    onChange={(val)  => { this.props.dispatch(addToTable(val))}}
                                    style={{list: {
                                            position: 'absolute',
                                            top: 40,
                                            left: 0,
                                            maxHeight: 250,
                                            minWidth: 330,
                                            overflow: 'auto',
                                            backgroundColor: theme.palette.secondary.main,
                                            zIndex: 10000,
                                    }}}/>
                                <br/>
                                <br/>
                                <FilterAdder 
                                    formVals={formVals} 
                                    filters={filters} 
                                    onChange={v => {
                                        console.log('updata filter', v.filters)
                                        this.props.dispatch(updateListForm(v))
                                        this.props.dispatch(getListFromFilters(v.filters))
                                    }
                                }/>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container className={classes.grid}>
                    <Grid item xs={12}>
                        <StudentTable
                        data={data}
                        ftype={convToType[ftype]}
                        fdefault={fdefault}
                        onSave={() => {
                            this.props.dispatch(saveNewFilter({
                                filter_type: ftype,
                                filter_name: fname ? fname : 'Filter',
                                filter_default: fdefault,
                                students_selected: data.map(d => ({
                                    'aadhar_id': d.aadhar_id,
                                    'value': d.value != null ? d.value : fdefault}))
                                }
                            ))
                        }}
                        onDelete={(v) => {
                            console.log('deleting', v)
                            this.props.dispatch(deleteFromTable(v))
                        }} 
                        onChange={(e) => {this.props.dispatch(updateTable(e))}}/>
                    </Grid>
                </Grid> 
            </div>
        </div>)
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(AddFilterContainer))