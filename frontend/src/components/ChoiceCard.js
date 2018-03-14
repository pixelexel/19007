import React, { Component } from 'react'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const styles = {
	card: {
		cursor: 'pointer',
	},
	media:{
		height: 200,
	},
}

class ChoiceCard extends Component{
	render(){
		const { classes } = this.props
		console.log('classes', classes)

		return (<Card onClick={this.props.onClick} className={classes.card}>
			<CardMedia
				className={classes.media}
				image={this.props.imageUrl}
			/>
			<CardContent>
				<Typography variant="subheading" align="center">
					{this.props.text}
				</Typography>
			</CardContent>
		</Card>	)
	}
}

export default withStyles(styles)(ChoiceCard)