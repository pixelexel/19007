import React from 'react'

/* Material UI imports */
import { withStyles } from 'material-ui/styles'
import Stepper, { Step, StepLabel } from 'material-ui/Stepper'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Select from 'material-ui/Select'
import { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Chip from 'material-ui/Chip'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import {graphTypes} from './GraphComponent'

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
	chip: {
	  margin: theme.spacing.unit / 2,
	},
})

class GraphCreator extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			activeStep: 0,
			selectedFilter: {
				name: '',
				op: null,
				val: null,
				type: '',
			},
			selectedListXAxis: '',
		}
	}

	getSteps = () => [this.props.varname + ' Name', 'Axes', 'Filters']

	getStepContent = step => {
		console.log('varname', this.props.varname)
		switch (step) {
			case 0:
				return 'Enter the title of the ' + this.props.varname.toLowerCase()
			case 1:
				return 'Enter the ' + (this.props.varname.toLowerCase() == 'graph' ? 'axes to be plotted' : 'parameters')
			case 2:
				return 'Enter filters'
			default:
				return 'Unknown step';
		}
	}

	handleNext = () => {
		const {
			activeStep
		} = this.state
		this.setState({
			activeStep: activeStep + 1,
		})
	}

	handleBack = () => {
		const {
			activeStep
		} = this.state;
		this.setState({
			activeStep: activeStep - 1,
		})
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

	handleGraphTypeChange = (e) => {
		this.props.update(
			Object.assign({}, this.props, {
				type: e.target.value,
			})
		)
	}

	handleFiltersChange = (type, id, e) => {
		let {filters} = this.props
		let { selectedFilter } = this.state
		let sFilter = Object.assign({}, selectedFilter)

		switch(type){
			case 'add':				
				let newFilters = filters.slice()
				if(selectedFilter.op === null){
					sFilter['op'] = '='
				}
				if(selectedFilter.val === null){
					switch(selectedFilter.type){
						case 'int': sFilter.val = 0
						break
						case 'bool': sFilter.val = 'False'
						break
						case 'string': sFilter.val = ''
						break
						case 'date': sFilter.val = ''
						break
						default:
						break
					}
				}


				newFilters.push(sFilter)

				this.props.update(
					Object.assign({}, this.props, {
						filters: newFilters,
					})
				)

				this.setState({
					selectedFilter: {
						name: '',
						op: null,
						val: null,
						type: '',
					}
				})

			break

			case 'delete':
				
				console.log('del', id)
				const val = filters[id]

				this.props.update(Object.assign({}, this.props, {
					filters: filters.filter(v => v != val) 
				}))
			break

			default:
				break
		}
	}

	handleFilterInputChange = (type, e) => {
		let v = e.target.value
		let { formVals } = this.props

		switch(type){
			case 'name':
				this.setState({
					selectedFilter: {
						name: v,
						val : null,
						op: null,
						type: formVals.filters[v].type,
					}
				})
			break

			case 'op':
				this.setState({
					selectedFilter: Object.assign({}, this.state.selectedFilter, {
						op: v,
					})
				})

				break

			case 'val':
				this.setState({
					selectedFilter: Object.assign({}, this.state.selectedFilter, {
						val: v,
					})
				})
				break
			default:
				break
		}	
	}

	handleAxesChange = (val, e) => {
		let d = {}
		d[val] = e.target.value 
		this.props.update(
			Object.assign({}, this.props, d)
		)
	}

	getValidOperators = (selectedFilter) => {
		let { type } = selectedFilter
		let { classes } = this.props

		let a = []
		switch(type){
			case 'int':
			case 'date':
				a = ['=', '>', '<', '>=', '<=']
				break
			case 'string':
			case 'bool':
				a = ['=']
				break

			default:
				a = []

		}

		if(selectedFilter.name == '') return null

		return (
				<FormControl styles={{marginLeft: 50}} className={classes.formControl}>
					<InputLabel htmlFor='add-op'>Operand</InputLabel>
					<Select value={selectedFilter.op == null ? a[0] : selectedFilter.op} 
						onChange={this.handleFilterInputChange.bind(this, 'op')} 
						inputProps={{
							id: 'add-op',
							name: 'add-op'
						}}>
						{a.map(op => {
							return (
									<MenuItem key={op} value={op}>{op}</MenuItem>
								)
						})}
					</Select> 
				</FormControl>
		)
	}

	getInputField = (selectedFilter) => {
		let { type } = selectedFilter
		let { classes } = this.props

		let defaultValue = ''
		if(type === 'int') defaultValue = 0
		if(type === 'bool') defaultValue = 'False'

		return (
			<FormControl className={classes.formControl}>
				<TextField required type={type === 'int' ? 'number' : 'text'} 
					onChange={this.handleFilterInputChange.bind(this, 'val')}
					value={selectedFilter.val !== null ? selectedFilter.val : defaultValue}
					label="Value"/>
			</FormControl>
		)		
	}

	handleListXAxisChange = (action, index, e) => {
		const {x} = this.props
		console.log(action, index, e)
		
		switch(action){
			case 'add': {
				let newX = Object.assign({}, x)
				newX[e.target.value] = true

				this.props.update(Object.assign({}, this.props, {
					x: newX 
				}))
				break
			}
			case 'delete':
				let newX = Object.assign({}, x)
				delete newX[index]
				this.props.update(Object.assign({}, this.props, {
					x: newX
				}))
				break
			default:
				break
		}
	}

	formChip = v => `${v.name} ${v.op} ${v.val}`

	getForm = (step) => {
		const {x, y, name, filters, classes, formVals, type} = this.props
		const paperStyle = {
			display: 'flex',
			justifyContent: 'left',
			flexWrap: 'wrap',
			padding: 4,
		}
		switch(step){
			case 0:
				return (
					
					<Grid container>
						<Grid item xs={3}>
							<FormControl className={classes.formControl}>
								<TextField label="Name" value={name} onChange={this.handleNameChange} />
							</FormControl>
						</Grid>
						{ this.props.varname == 'Graph' ? (
						 <Grid item xs={3}>
						 	<FormControl className={classes.formControl}>
							 	<InputLabel htmlFor="type">Type</InputLabel>
								<Select label="Type" value={type} onChange={this.handleGraphTypeChange} 
									inputProps={{
										name: 'type',
										id: 'type', 
									}}>
									{
										Object.keys(graphTypes).map(k=> (
										<MenuItem key={k} value={graphTypes[k]}>{graphTypes[k]}</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>) : null }	
					</Grid>
				)

			case 1:
				return ( this.props.varname == 'Graph' ? (<Grid container>
						<Grid item xs={4}>
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="x">X Axis</InputLabel>
								<Select value={x} 
									onChange={this.handleAxesChange.bind(this, 'x')} inputProps={{
										name: 'x',
										id: 'x', 
									}} >
									{
										formVals.x.map(v=> {
										return (
											<MenuItem key={v} value={v}>{v}</MenuItem>
										)
									})}
								</Select>
							</FormControl>
						</Grid>
						
							<Grid item xs={4}> 
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
								</FormControl>
							</Grid>
						</Grid>) : (<div className="chips-container"> 
								<Paper style={paperStyle} className={classes.root}>
								{
									Object.keys(x).map( (v, index) => {
									return (
										<Chip id={index}
											key={index} 
											onDelete={this.handleListXAxisChange.bind(this, 'delete', v)} 
											className={classes.chip} 
											label={v}/>
									)
								} )}
								</Paper>
								<br/>
								<InputLabel htmlFor='add-listx'>Parameters</InputLabel>
								<Select value={this.state.selectedListXAxis}
									onChange={this.handleListXAxisChange.bind(this, 'add', 'meh')}
									inputProps={{
										name: 'add-listx',
										id: 'add-listx',
									}}>
									{
										formVals.x.map(k => {

											return (
												<MenuItem key={k} value={k}>{k}</MenuItem>
											)
										})}
								</Select>
							</div>))
						

			case 2:
				const filterVals = formVals.filters
				const filterValsKeys = Object.keys(filterVals)

				return (
				<div>
					
					<div className="chips-container"> 
						<Paper style={paperStyle} className={classes.root}>
						{
							filters.map( (v, index) => {
							return (
								<Chip id={index}
									key={this.formChip(v)} 
									onDelete={this.handleFiltersChange.bind(this, 'delete', index)} 
									className={classes.chip} 
									label={this.formChip(v)}/>
							)
						} )}
						</Paper>
					</div>
					<br/>

					<FormControl>
						<Grid container>
							<Grid item xs={4}>
								<InputLabel htmlFor='add-filter'>Filter name</InputLabel>
								<Select value={this.state.selectedFilter.name} 
										onChange={this.handleFilterInputChange.bind(this, 'name')} 
										inputProps={{
											name: 'add-filter',
											id: 'add-filter', 
										}}>
									{
										filterValsKeys.map(k=> {
								
										return (
											<MenuItem key={k} value={k}>{k}</MenuItem>
										)
									})}
								</Select>
							</Grid>
							<Grid style={{textAlign: 'center'}} item xs={4}>
								{ this.getValidOperators(this.state.selectedFilter) }
							</Grid>
							<Grid item xs={4}>
								{ this.state.selectedFilter.name !== '' ? this.getInputField(this.state.selectedFilter) : null }
							</Grid>
						</Grid>
						<br/>
							{ this.state.selectedFilter.name !== '' && this.state.selectedFilter.val !== '' ? (
							<Grid item xs={3}>
							<Button variant="raised" color="primary" 
									className={classes.button} 
									onClick={this.handleFiltersChange.bind(this, 'add', -1)}>
							    Add
							</Button></Grid>) : null 
							
						}
					</FormControl>
				</div>)

			default:
				return null
		}
	}

	render() {
		console.log('GRAPHCREATOR', this.props, this.state)
		const { classes } = this.props;
		const steps = this.getSteps();
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
	              <Typography className={classes.instructions}>{this.getStepContent(activeStep)}</Typography>
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