import React from 'react'

/* Material UI imports */
import { withStyles } from 'material-ui/styles'
import Stepper, { Step, StepLabel } from 'material-ui/Stepper'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Select from 'material-ui/Select'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Chip from 'material-ui/Chip'

const styles = theme => ({
	root: {
		width: '90%',
	},
	button: {
		marginRight: theme.spacing.unit,
	},
	instructions: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
	},
});

function getSteps() {
	return ['Graph Name', 'Axes', 'Filters']
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return 'Enter the title of the graph'
		case 1:
			return 'Enter the axes to be plotted'
		case 2:
			return 'Enter filters'
		default:
			return 'Unknown step';
	}
}

class GraphCreator extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			activeStep: 0,
			selectedFilter: '',
		}
	}

	handleNext = () => {
		const {
			activeStep
		} = this.state
		this.setState({
			activeStep: activeStep + 1,
		})

		// this.props.setActiveStep(this.props.activeStep + 1)
	}

	handleBack = () => {
		const {
			activeStep
		} = this.state;
		this.setState({
			activeStep: activeStep - 1,
		})

		// this.props.setActiveStep(this.props.activeStep - 1)
	}

	handleSave = () => {
		this.props.save(this.props)
	}

	handleNameChange = (e) => {
		this.props.update(
			Object.assign({}, this.props, {
				name: e.target.value,
			})
		)
	}

	handleFiltersChange = () => {

	}

	handleAxesChange = (val, e) => {
		let d = {}
		d[val] = e.target.value 
		this.props.update(
			Object.assign({}, this.props, d)
		)
	}

	getValidOperators = (selectedFilter) => {

	}

	getInputField = (selectedFilter) => {

	}

	getForm = (step) => {
		console.log(this.props)

		function formChip(v){
			return `${v.name} - ${v.op} - ${v.val}`
		}

		const {x, y, name, filters, classes, formVals} = this.props

		switch(step){
			case 0:
				return (
					<TextField label="name" value={name} onChange={this.handleNameChange} />		
				)
			case 1:
				return (
					<div>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="x">X Axis</InputLabel>
							<Select value={x} onChange={this.handleAxesChange.bind(this, 'x')} inputProps={{
								name: 'x',
								id: 'x', 
							}}>
								{
									formVals.x.map(v=> {
									return (
										<MenuItem key={v} value={v}>{v}</MenuItem>
									)
								})}
							</Select>
						</FormControl>
						<br/>
						{ formVals.y ? 
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="y">Y Axis</InputLabel>
								<Select value={y} onChange={this.handleAxesChange.bind(this, 'y')} inputProps={{
									name: 'y',
									id: 'y', 
								}}>
									
									{ 

									formVals.y.map(v=> {
										return (
											<MenuItem key={v} value={v}>{v}</MenuItem>
										)
									})}
								</Select>
							</FormControl> : null
						}
					</div>
				)

			case 2:
				return (<div>
					<div className="chips-container"> 
						{
							this.props.filters.map(v => {
							return (
								<Chip onDelete={this.handleFiltersChange.bind(this, 'delete')} className={classes.chip} label={formChip(v)}/>
							)
						} )}
					</div>
					<FormControl>
						<InputLabel htmlFor='add-filter'>X Axis</InputLabel>
						<Select value={''} onChange={this.handleFilterInputChange} inputProps={{
							name: 'add-filter',
							id: 'add-filter', 
						}}>
							{
								formVals.filters.map(v=> {
								return (
									<MenuItem key={v.name} value={v.name}>{v.name}</MenuItem>
								)
							})}
						</Select>

						{ this.getValidOperators(this.state.selectedFilter) }
						{ this.state.selectedFilter !== '' ? this.getInputField(this.state.selectedFilter) : null }
						{ this.state.selectedFilter !== '' && this.state.selectedFilter.val !== '' ? (
							<Button variant="raised" color="primary" 
									className={classes.button} 
									onClick={this.handleFiltersChange.bind(this, 'add')}>
							    Add
							</Button>) : null 
						}
					</FormControl>
				</div>)

			default:
				return null
		}
	}

	render() {
		console.log('GRAPHCREATOR', this.props)
		const { classes } = this.props;
		const steps = getSteps();
		const { activeStep } = this.state;

	    return (
	      <div className={classes.root}>
	        <Stepper activeStep={activeStep}>
	          {steps.map((label, index) => {
	            const props = {};
	            const labelProps = {};

	            return (
	              <Step key={label} {...props}>
	                <StepLabel {...labelProps}>{label}</StepLabel>
	              </Step>
	            );
	          })}

	        </Stepper>
	        <div>
	          {activeStep === steps.length ? (
	            <div>
	              <Typography className={classes.instructions}>
	                All steps completed
	              </Typography>
	              <Button onClick={this.handleSave} className={classes.button}>
	                Save
	              </Button>
	            </div>
	          ) : (
	            <div>
	              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
	              {this.getForm(this.state.activeStep)}
	              <br/>
	              <br/>
	              <div>
	                <Button
	                  disabled={activeStep === 0}
	                  onClick={this.handleBack}
	                  className={classes.button}
	                >
	                  Back
	                </Button>

	                <Button
	                  variant="raised"
	                  color="primary"
	                  onClick={this.handleNext}
	                  className={classes.button}
	                >
	                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
	                </Button>
	              </div>
	            </div>
	          )}
	        </div>
	      </div>
	    );
  }
}

export default withStyles(styles)(GraphCreator);