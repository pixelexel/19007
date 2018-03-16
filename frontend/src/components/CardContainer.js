import React, {Component} from 'react'
import ReactGridLayout  from 'react-grid-layout'

const cardContainerStyles = {
	overflowY: 'scroll',
	width: '100%',
}

class CardContainer extends Component{
	constructor(props){
		super(props)

		this.state = {
			layout: this.getLayout(props)
		}
	}

	componentWillReceiveProps(newProps){
		if(newProps.graph !== this.props.graph || newProps.list !== this.props.list){
			this.setState({
				layout: this.getLayout(newProps)
			})
		}
	}

	getLayout = (props) => {
		console.log('card container', props)
		const { graph, list } = props
		const graphs = graph.graphs
		const lists = list.lists

		let defaultWidth = 4, defaultHeight = 8, dx = 0, dy = 0
		let choice, gp = 0, lp = 0
		let layout = []

		for(let i = 0 ; i < graphs.length + lists.length; i++){
			choice = Math.floor(Math.random()*2) + 1
			if(gp >= graphs.length){
				layout.push({
					i: i.toString(), x: dx, y: dy, h: defaultHeight + 4, w: defaultWidth,
					data: lists[lp++], type: 'list',
				})
			}
			else if(lp >= lists.length){
				layout.push({
					i: i.toString(), x: dx, y: dy, h: defaultHeight, w: defaultWidth,
					data: graphs[gp++], type: 'graph',
				})
			} 
			else{
				if(choice == 1){
					layout.push({
						i: i.toString(), x: dx, y: dy, h: defaultHeight + 4, w: defaultWidth,
						data: lists[lp++], type: 'list',
					})
				}
				else{
					layout.push({
						i: i.toString(), x: dx, y: dy, h: defaultHeight, w: defaultWidth,
						data: graphs[gp++], type: 'graph',
					})
				}
			}

			dx = (dx + defaultWidth)%12
			if(dx === 0) dy += 1
		}
		return layout
	}

	render(){
		const { layout } = this.state

		return(
			<ReactGridLayout className="layout" layout={layout}
			cols={12} rowHeight={30} margin={[20, 20]} width={window.innerWidth}>

				{layout.map(k => (
					<div style={{backgroundColor: '#E07A5F', borderWidth: 2, borderColor: 'black', borderStyle: 'solid'}} key={k.i}>{k.data.name}</div>
				))}
			</ReactGridLayout>
		)
	}
}

export default CardContainer