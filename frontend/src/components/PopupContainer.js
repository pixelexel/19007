import React, {Component} from 'react'
import Modal from 'material-ui/Modal'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import ChoiceCard from './ChoiceCard'
import { IMAGE_URL } from '../config'

export const screens = {
	CHOOSE: 'CHOOSE',
	GRAPH_SELECT: 'GRAPH_SELECT',
	LIST_SELECT: 'LIST_SELECT',
}

const styles = theme => {
	return {
		paper: {
			position: 'absolute',
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[3],
			padding: theme.spacing.unit*4,
		}}
}

const modalStyle = {
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: 600,
}

class PopupContainer extends Component{
	constructor(props){
		super(props)
		this.getScreen = this.getScreen.bind(this)
	}

	changeScreen(screen){
		this.props.setScreen(screen)
	}

	getScreen(){
		switch(this.props.screen){
			case screens.CHOOSE:
				return (
					<div>
						<Grid container>
							<Grid item xs={6}>
								<ChoiceCard id="choice-card-graph" 
											key="GraphCard" 
											imageUrl={IMAGE_URL + 'graph.png'}
											text="Add a new graph"
											onClick={
												this.changeScreen
												.bind(this, screens.GRAPH_SELECT)}
											/>
							</Grid>
							<Grid item xs={6}>
								<ChoiceCard id="choice-card-list"
											key="ListCard"
											imageUrl={IMAGE_URL + 'list.png'}
											text="Add a new list"
											onClick={
												this.changeScreen
												.bind(this, screens.LIST_SELECT)}
											/>
							</Grid>
						</Grid>
					</div>
				)

			case screens.GRAPH_SELECT:
				return (
					<div>	Make a graph
					</div>
				)

			case screens.LIST_SELECT:
				return (
					<div> Make a list </div>
				)
			default:
				return null
		}
	}

	render(){
		console.log('PopupContainer', this.props)
		const { classes } = this.props

		return (
			<Modal
				open={this.props.open}
				onClose={this.props.onClose}
			>
				<div style={modalStyle} className={classes.paper}>
					{this.getScreen()}
				</div>

			</Modal>
		)
	}
} 


export default withStyles(styles)(PopupContainer)