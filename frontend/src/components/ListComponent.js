import React, { Component } from 'react'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'
import ImageIcon from 'material-ui-icons/Image'

const styles = (theme) => ({
	root: {
		width: '90%',
		height: '80%',
		borderTopColor: theme.palette.grey[100],
		borderStyle: 'solid',
		borderWidth: 0,
		borderTopWidth: 1.8,
		margin: '0 auto',
		overflow: 'auto',
		marginBottom: 15
	}
})

class ListComponent extends Component{
	render(){
		const { classes, data } = this.props
		let listData = data.data

		return(
			<div className={classes.root}>
		      <List>
		      	{ listData.map(v => (
		      		<ListItem key={v}>
		      		  <Avatar>
		      		    <ImageIcon />
		      		  </Avatar>
		      		  <ListItemText primary={v} secondary="" />
		      		</ListItem>
		      	))}
		        
		      </List>
		    </div>
		)
	}
}

export default withStyles(styles)(ListComponent)