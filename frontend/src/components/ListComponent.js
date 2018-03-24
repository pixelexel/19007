import React, { Component } from 'react'
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'
import ImageIcon from 'material-ui-icons/Image'
import '../styles/list.scss'

const styles = (theme) => ({
	root: {
		width: '90%',
		height: 'calc(100% - 100px)',
		backgroundColor: theme.palette.secondary.light,
		margin: '0 auto',
		overflow: 'auto',
		paddingBottom: 15,
	},
	alignRight: {
		textAlign: 'right'
	},
	unsticky: {
		position: 'relative',
	}
})

class ListComponent extends Component{
	render(){
		const { classes, data } = this.props
		const listData = data.data
		const { x, filters } = data
		const filterNames = filters.map(f => `${f.name}${f.op}${f.val}`).join(', ')

		console.log('LIST COMPONENT', listData, this.props)
		return(
			<div className={classes.root}>
		      <List
		      	subheader={<ListSubheader className={classes.unsticky} component="div">{`Students ${x} with ${filterNames}`}</ListSubheader>}>

		      {
		      	listData.map((d, index) => {
		      		return <ListItem key={index}>
		      					<ListItemText primary={d.name}/>
		      					<ListItemText className={classes.alignRight} primary={d.value.toString()}/>
		      				</ListItem>
		      	})
		      }
		      </List>
		    </div>
		)
	}
}

/*
{ listData.map(v => (
	<ListItem key={v}>
	  <Avatar>
	    <ImageIcon />
	  </Avatar>
	  <ListItemText primary={v} secondary="" />
	</ListItem>
))}
*/
/*
	<ListItemText key={index} primary={d['name']} secondary={d['value']}/>
*/
export default withStyles(styles)(ListComponent)