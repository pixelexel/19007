import React, { Component } from 'react'
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List'
import { Table, TableBody, TableCell, TableHead, TableRow } from 'material-ui'
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
	},
	table:{
		overflow: 'auto'
	}
})

class ListComponent extends Component{
	render(){
		console.log('LIST COMPONENT', listData, this.props)
		const { classes, data } = this.props
		const listData = data.data
		const { x, filters } = data
		const filterNames = filters.map(f => `${f.name}${f.op}${f.val}`).join(', ')

		
		return(
			<div style={this.props.style} className={classes.root}>
		      <Table className={classes.table}>
				  <TableHead>
						<TableRow>
							<TableCell> name </TableCell>
							{
								Object.keys(x).map((k, index) => (
									<TableCell key={index}>{k}</TableCell>
								))
							}
						</TableRow>
				  </TableHead>
				  <TableBody>
					  { listData.map((d, index) => (
						  <TableRow key={index}>
							<TableCell>{d['name']}</TableCell>
							  { d['value'].map((v, vindex) => (
								  <TableCell key={vindex}>{v}</TableCell>
							  ))}
						  </TableRow>
					  )) }
					</TableBody>
			  </Table>
		    </div>
		)
	}
}

export default withStyles(styles)(ListComponent)