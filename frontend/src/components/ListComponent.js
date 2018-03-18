import React, { Component } from 'react'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'
import ImageIcon from 'material-ui-icons/Image'

const styles = (theme) => ({
	root: {
		width: '90%',
		height: 'calc(100% - 100px)',
		backgroundColor: theme.palette.secondary.light,
		margin: '0 auto',
		overflow: 'auto',
		
		paddingBottom: 15,
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