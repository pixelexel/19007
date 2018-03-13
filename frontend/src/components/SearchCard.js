import React, { Component } from 'react'

//SearchCard is a presentational component and thus does not
//dispatch actions or connects to the store
export default class SearchCard extends Component{
	constructor(props){
		super(props)
		this.state = {
			'text': ''
		}
	}

	updateInputValue(e){
		this.setState({
			'text': e.target.value
		})
	}

	render(){
		let style = {
			'paddingTop': 35
		}

		return (
			<div style={style}>
				<input
					style={{'width': 300}} 
					type="text" 
					value={this.state.text} 
					onChange={e => this.updateInputValue(e)}/>
				<button 
					onClick={e => this.props.onClick(this.state.text)}>
					Search
				</button>
				
				{ 
					this.props.isFetching ? 
					(<p> Searching </p>) : 
					(
						this.props.data.map(v => (
								<p key={v}> {v} </p>
						))
					)
				}
			</div>
		)
	}
}