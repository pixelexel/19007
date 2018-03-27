import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { Menu, List, ListItem, ListItemText } from 'material-ui'
import { getSuggestion } from '../actions/searchbar'
import TextField from 'material-ui/TextField'
import { changeScreen, screens } from '../actions/root'
import '../styles/list.scss'

const mapStateToProps = (state) => {
	return {
		district: state.searchBar.district,
		school: state.searchBar.school,
		student: state.searchBar.student,
		state: state.searchBar.state,
	}
}

const styles = theme => ({
	root: {
		position: 'absolute',
		top: 48,
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
		this.props.dispatch(getSuggestion({query:e.target.value}))
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
		this.props.dispatch(getSuggestion({query: ''}))
	}

	render(){		
		const { school, student, state, district, classes, theme } = this.props
		const keys = Object.keys(this.props)
		const totalLength = school.length + student.length + state.length + district.length
		const allValues = []
		let counter = 0

		for(let k in keys){
			counter = 0
			if(keys[k] == 'classes' || keys[k] == 'theme') continue
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
		allValues.sort((a, b) => ordering[a.type] - ordering[b.type])

		return(
			<div>
				<TextField type="text" 
					value={this.state.searchText} 
					onChange={this.onTextChange}
					placeholder={"Search"}
					className={classes.textField}/>
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
				</div>
		    </div>
		)
	}
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(Search_bar))