import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { Menu, List, ListItem, ListItemText } from 'material-ui'
import { getSuggestion } from '../actions/searchbar'
import TextField from 'material-ui/TextField'
import { changeScreen, screens } from '../actions/root'
import '../styles/list.scss'
import { levDist } from '../utils'

const mapStateToProps = (state) => {
	return {
		district: state.searchBar.district,
		school: state.searchBar.school,
		student: state.searchBar.student,
		state: state.searchBar.state,
		target: state.searchBar.target,
	}
}

const styles = theme => ({
	root: {
		position: 'absolute',
		top: 65,
		right: 50,
		maxHeight: 250,
		minWidth: 330,
		overflow: 'auto',
		backgroundColor: theme.palette.secondary.main,
	},
	removePointerEvents: {
		pointerEvents: 'none',
	},
	textField:{
		minWidth: 300,
	},
	listItem: {
		cursor: 'pointer',
	}
})

class Search_bar extends Component{
	constructor(props){
		super(props)
		this.state = {
			searchText: '',
		}
	}

	onTextChange = (e) => {
		this.setState({searchText: e.target.value})
		this.props.dispatch(getSuggestion({query:e.target.value}, 'search-bar'))
	}

	handleClick = (e) => {
		const eid = e.target.id
		const [ type, value, id ] = eid.split('-')
		
		switch(type){
			case 'student':
				this.props.dispatch(changeScreen(screens.STUDENT, id))
				break
			case 'state':
				this.props.dispatch(changeScreen(screens.STATE, value))
				break
			case 'district':
				this.props.dispatch(changeScreen(screens.DISTRICT, value))
				break
			case 'school':
				this.props.dispatch(changeScreen(screens.SCHOOL, value))
				break
			default:
		}

		this.setState({
			searchText: '',
		})
		this.props.dispatch(getSuggestion({query: ''}, 'search-bar' ))
	}

	render(){
		let { school, student, state, district, classes, theme, target } = this.props
		const keys = Object.keys(this.props)
		const totalLength = school.length + student.length + state.length + district.length
		const allValues = []
		let counter = 0

		if(target == 'search-bar'){
			for(let k in keys){
				counter = 0
				if(keys[k] == 'classes' || keys[k] == 'theme' || keys[k] == 'target') continue
				for(let j in this.props[keys[k]]){
					counter ++
					if(counter > 5) break

					allValues.push({
						id: this.props[keys[k]][j].id,
						name: this.props[keys[k]][j].name,
						type: keys[k],
					})
				}
			}

			const ordering = { 'student': 0, 'school': 1, 'state': 2, 'district': 3 }
			const distances = {}
			console.log(allValues, this.state.searchText)

			for(let i in allValues){
				distances[allValues[i].name] = levDist(allValues[i].name, this.state.searchText)
			}
			allValues.sort((a, b) =>  distances[a.name] - distances[b.name])
		}

		return(
			<div>
				<TextField type="text" 
					value={this.state.searchText} 
					onChange={this.onTextChange}
					placeholder={"Search"}
					label="Search"
					className={classes.textField}/>
				{ allValues.length > 0 &&
				<div className={classes.root}>
					<List >
						{ allValues.map((d, index) => (
							<ListItem key={index} className={classes.listItem + ' hoverlistitem'} 
									onClick={this.handleClick} 
									id={`${d.type}-${d.name}-${d.id}`}>
								<ListItemText className={classes.removePointerEvents} primary={d.name} secondary={d.type}/>
							</ListItem> 
						))}
					</List>
					</div> }
		    </div>
		)
	}
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(Search_bar))