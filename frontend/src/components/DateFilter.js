import React, { Component } from 'react'
import { Grid, TextField } from 'material-ui'

class DateFilter extends Component{
    constructor(props){
        super(props)
        this.state = {
            start: 0,
            end: 0,
            error: false,
        }
    }

    onChange = (e) => {
        switch(e.target.name){
            case 'start':
                this.setState({
                    start: e.target.value
                })
            break
            
            case 'end':
                this.setState({
                    end: e.target.value,
                })
            break
        }
    }

    onBlur = (e) => {
        this.props.onChange(this.state)
    }

    handleKeyPress = (e) => {
        if(e.key == 'Enter'){
            this.onBlur(e)
            e.target.blur()
        }
    }

    render(){
        if(!this.props.open) return null
        // const width = this.props.open ? 'auto' : 0
        
        return (
        <div style={{...this.props.style}}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        type="number" 
                        onBlur={this.onBlur} 
                        onChange={this.onChange} 
                        onKeyPress={this.handleKeyPress}
                        name="start" 
                        value={parseFloat(this.state.start)}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField 
                        onBlur={this.onBlur} 
                        onChange={this.onChange}
                        onKeyPress={this.handleKeyPress}
                        type="number" 
                        name="end" 
                        value={parseFloat(this.state.end)} />
                </Grid>
            </Grid>
        </div>)
    }
}

export default DateFilter