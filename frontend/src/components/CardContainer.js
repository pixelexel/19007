import React, {Component} from 'react'
import ReactGridLayout  from 'react-grid-layout'
import AnalyticsCard from './AnalyticsCard'
import GraphComponent from './GraphComponent'
import ListComponent from './ListComponent'
import TrendingUpIcon from 'material-ui-icons/TrendingUp'
import ViewListIcon from 'material-ui-icons/ViewList'

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
		let type = ''
		for(let i = 0 ; i < graphs.length + lists.length; i++){
			choice = Math.floor(Math.random()*2) + 1
			if(gp >= graphs.length){
				layout.push({
					i: i.toString(), x: dx, y: dy, h: defaultHeight + 2, w: defaultWidth,
					minH: defaultHeight - 2, minW: defaultWidth - 1,
					data: lists[lp++], type: 'list',
				})
				type = 'list'
			}
			else if(lp >= lists.length){
				layout.push({
					i: i.toString(), x: dx, y: dy, h: defaultHeight, w: defaultWidth,
					minW: defaultWidth - 1, minH: defaultHeight, 
					data: graphs[gp++], type: 'graph',
				})
				type = 'graph'
			} 
			else{
				if(choice == 1){
					layout.push({
						i: i.toString(), x: dx, y: dy, h: defaultHeight + 2, w: defaultWidth,
						minH: defaultHeight - 2, minW: defaultWidth - 1,
						data: lists[lp++], type: 'list',
					})
					type = 'list'
				}
				else{
					layout.push({
						i: i.toString(), x: dx, y: dy, h: defaultHeight, w: defaultWidth,
						minW: defaultWidth - 1, minH: defaultHeight,
						data: graphs[gp++], type: 'graph',
					})
					type = 'graph'
				}
			}

				dx = (dx + defaultWidth)%12
			if(dx === 0) dy += 1
		}
		return layout
	}
	//<div style={{backgroundColor: '#E07A5F', borderWidth: 2, borderColor: 'black', borderStyle: 'solid'}} key={k.i}>{k.data.name}</div>
//					<AnalyticsCard {...this.props} name={k.data.name} key={k.i}/>

	render(){
		const { layout } = this.state

		return(
			<ReactGridLayout className="layout" layout={layout}
			cols={12} rowHeight={30} margin={[20, 20]} width={window.innerWidth}>

				{layout.map(k => (
					<div key={k.i}>
						<AnalyticsCard
							icon={ k.type == 'graph' ? <TrendingUpIcon/> : <ViewListIcon/>}
							style={{paddingTop: 10, paddingBottom: 10}}
							id={k.data.id} 
							name={k.data.name}
							subheader={k.data.filters.map(v => `${v.name} ${v.op} ${v.val}`).join(', ')}
							onEdit={this.props.onEdit}
							onDelete={this.props.onDelete}
							type={k.type}>

							{ k.type == 'graph' ? 
								<GraphComponent data={k.data}/> :
								<ListComponent data={k.data}/>
							}
						</AnalyticsCard>
					</div>

				))}
			</ReactGridLayout>
		)
	}
}

export default CardContainer