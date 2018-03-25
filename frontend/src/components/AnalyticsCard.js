import React, { Component } from 'react'
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import  DeleteIcon from 'material-ui-icons/Delete'
import FileDownloadIcon from 'material-ui-icons/FileDownload'
import EditIcon from 'material-ui-icons/Edit'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  card: {
  	width: '100%',
  	height: '100%',
  },
  actions:{
  	marginBottom: 'auto',
  	alignSelf: 'bottom'
  },
  avatar:{
  	backgroundColor: theme.palette.primary.main,
  }
})

class AnalyticsCard extends Component{
	edit = () => {
		this.props.onEdit(this.props.id, this.props.type)
	}

	delete = () =>{
		this.props.onDelete(this.props.id, this.props.type)
	}

	download = () => {
		this.props.onDownload(this.props.id, this.props.type)
	}

	render(){
		const { classes, name, subheader, actionDisabled } = this.props
		let action
		if(!this.props.actionDisabled){
			action = (<div>
				<IconButton onClick={this.edit} aria-label="Edit">
					<EditIcon />
				</IconButton>
				<IconButton aria-label="Delete">
					<DeleteIcon onClick={this.delete}/>
				</IconButton>
				{ this.props.onDownload && (
				<IconButton aria-label="Delete">
					<FileDownloadIcon onClick={this.download} />
				</IconButton> )}
			</div>)
		}
		else {
			action = null
		}

		return(
			<Card className={classes.card}>
				<CardHeader
		            avatar={
		              <Avatar aria-label="Name" className={classes.avatar}>
		                { this.props.icon }
		              </Avatar>
		            }
		            title={name}
		            subheader={subheader}
		            action={action}
		         />
		        
				{ this.props.children }
			</Card>
		)
	}
}

export default withStyles(styles)(AnalyticsCard)