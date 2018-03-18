import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button'
import PopupContainer, {screens} from '../components/PopupContainer'
import CardContainer from '../components/CardContainer'

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
	return state
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
		this.editCard = this.editCard.bind(this)
		this.deleteCard = this.deleteCard.bind(this)
	}

	componentWillMount(){
		this.props.dispatch(getAllGraphs(this.props.screen))
		this.props.dispatch(getAllLists(this.props.screen))
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
		this.props.dispatch(addGraph(data))
		this.props.dispatch(closePopup())
	}

	updateGraph(data){
		this.props.dispatch(updateGraphForm(data))
	}

	addList(data){
		this.props.dispatch(addList(data))
		this.props.dispatch(closePopup())
	}

	updateList(data){
		this.props.dispatch(updateListForm(data))
	}

	getFormVals(){
		this.props.dispatch(getFormVals())
	}

	editCard(id, type){
		switch(type){
			case 'graph': {
				this.props.dispatch(openPopup({
					screen: screens.GRAPH_SELECT,
					graph: this.props.graph.graphs.filter(v => v.id.toString() == id)[0]
				}))
			}

			break

			case 'list':
				this.props.dispatch(openPopup({
					screen: screens.LIST_SELECT,
					list: this.props.list.lists.filter(v => v.id.toString() == id)[0]
				}))
				break
			default:
		}
	}

	deleteCard(id, type){
		switch(type){
			case 'graph':
				this.props.dispatch(removeGraph(id))
				break
			case 'list':
				this.props.dispatch(removeList(id))
				break
		}
	}

	render(){
		console.log('HomeScreenContainer', this.props)
		const {classes} = this.props

		return (
			<div>
				<CardContainer onEdit={this.editCard} onDelete={this.deleteCard} {...this.props}/>

				<PopupContainer {...this.props.popup} 
						onClose={this.hidePopup} 
						setScreen={this.changePopupScreen}
						addGraph={this.addGraph}
						updateGraphForm={this.updateGraph}
						addList={this.addList}
						updateListForm={this.updateList}
						getFormVals={this.getFormVals.bind(this)}/>

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