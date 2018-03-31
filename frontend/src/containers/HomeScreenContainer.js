import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button'
import PopupContainer, {screens} from '../components/PopupContainer'
import CardContainer from './CardContainer'

import { openPopup, closePopup, setScreen, 
		updateGraphForm, updateListForm, getFormVals } from '../actions/popup'
import { addGraph, getAllGraphs, removeGraph } from '../actions/graph'
import { addList, getAllLists, removeList } from '../actions/list'

/*
	HomeScreenContainer is a container component. It is stateful,
	and can dispatch actions to the store
*/

// Map the state (from store) to props -> Redux function
function mapStateToProps(state){
	return {
		popup: state.popup,
	}
}

const styles = theme => ({
	fab: {
		position: 'fixed',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2,
		backgroundColor: theme.palette.primary.main,
	}
})


class HomeScreenContainer extends Component{
	constructor(props){
		super(props)
		this.showPopup = this.showPopup.bind(this)
		this.hidePopup = this.hidePopup.bind(this)
		this.addGraph = this.addGraph.bind(this)
		this.changePopupScreen = this.changePopupScreen.bind(this)
		this.updateGraph = this.updateGraph.bind(this)
		this.addList = this.addList.bind(this)
		this.updateList = this.updateList.bind(this)
	}
	
	componentWillMount(){
		this.props.dispatch(getAllGraphs(this.props.id))
		this.props.dispatch(getAllLists(this.props.id))
	}

	componentWillReceiveProps(newProps){
		console.log('proror', this.props, newProps)
		if(newProps.id != this.props.id){
			this.props.dispatch(getAllGraphs(newProps.id))
			this.props.dispatch(getAllLists(newProps.id))
		}
	}

	showPopup(defaults){
		this.props.dispatch(openPopup(defaults))
	}

	hidePopup(){
		this.props.dispatch(closePopup())
	}

	changePopupScreen(screen){
		this.props.dispatch(setScreen(screen))
	}

	addGraph(data){
		let newData = Object.assign({}, data)
		newData['dash_id'] = this.props.id
		this.props.dispatch(addGraph(newData))
		this.props.dispatch(closePopup())
	}

	updateGraph(data){
		this.props.dispatch(updateGraphForm(data))
	}

	addList(data){
		let newData = Object.assign({}, data)
		newData['dash_id'] = this.props.id
		this.props.dispatch(addList(newData))
		this.props.dispatch(closePopup())
	}

	updateList(data){
		this.props.dispatch(updateListForm(data))
	}

	getFormVals(){
		this.props.dispatch(getFormVals())
	}

	
	render(){
		console.log('HomeScreenContainer', this.props)
		const {classes} = this.props

		return (
			<div>
				<CardContainer name={this.props.name} id={this.props.id}/>

				<PopupContainer {...this.props.popup} 
						onClose={this.hidePopup} 
						setScreen={this.changePopupScreen}
						addGraph={this.addGraph}
						updateGraphForm={this.updateGraph}
						addList={this.addList}
						updateListForm={this.updateList}
						getFormVals={this.getFormVals.bind(this)}
						/>

				<Button variant="fab" 
						className={classes.fab} 
						color="primary"
						onClick={this.showPopup.bind(this)}>
						<AddIcon/>
				</Button>
			</div>
		)
	}
}

const HomeScreenContainerWrapper = withStyles(styles, {withTheme: true})(HomeScreenContainer)
export default connect(mapStateToProps)(HomeScreenContainerWrapper)