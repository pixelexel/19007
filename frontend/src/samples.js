// /api/getFormVals/
export const formVals = {
	error: false,
	graph: {
		x: ['time', 'average_marks', 'sports_activity', 'cultural_activity'],
		y: ['time', 'sports_activity', 'average_marks', 'cultural_activity'],
		filters: {
				no_of_siblings: {
					name: 'no_of_siblings',
					type: 'int'
				},
				parent_salary: { 
					name: 'parent_salary',
					type: 'int',
				},
				is_handicapped: {
					name:'is_handicapped',
					type: 'bool'
				},
		},
	},
	list: {
		x: ['average_marks', 'sports_activity', 'cultural_activity'],
		filters:  {
				no_of_siblings: {
					name: 'no_of_siblings',
					type: 'int'
				},
				parent_salary: { 
					name: 'parent_salary',
					type: 'int',
				},
				is_handicapped: {
					name:'is_handicapped',
					type: 'bool'
				},
		},
	}
}

// api/get_all_graphs/
export const sampleGraphs = () => {
	let graphs = []
	let axes = ['average_marks', 'sports_activity', 'cultural_activity']
	let filters = [{
					name: 'no_of_siblings',
					type: 'int',
					val: 3,
					op: '='
				},
				{ 
					name: 'parent_salary',
					type: 'int',
					val: 300000,
					op: '>='
				},
				{
					name:'is_handicapped',
					type: 'bool',
					val: 'False',
					op: '=',
				}]

	for(let i = 0 ; i < 5; i++){
		let x = axes[Math.floor(Math.random()*axes.length)],
			y = axes[Math.floor(Math.random()*axes.length)],
			filter = filters[Math.floor(Math.random()*filters.length)],
			data = [];

		let d = {}
		for(let j = 0 ; j < 10; j ++){
			d = {}
			d[x] = j+1
			d[y] = Math.ceil(Math.random() * (3000 - 1000) + 1000)
			d[filter.name] = Math.ceil(Math.random() * (3000 - 1000) + 1000)
			data.push(d)
		}

		graphs.push({
			id: i+1,
			x: x,
			y: y,
			filters: [filter],
			data: data,
		})
	}

	return {
		error: false,
		graphs: graphs,
	}
}

export const sampleLists = () => {
	let graphs = []
	let axes = ['time', 'average_marks', 'sports_activity', 'cultural_activity']
	let filters = [{
					name: 'no_of_siblings',
					type: 'int',
					val: 3,
					op: '='
				},
				{ 
					name: 'parent_salary',
					type: 'int',
					val: 300000,
					op: '>='
				},
				{
					name:'is_handicapped',
					type: 'bool',
					val: 'False',
					op: '=',
				}]

	for(let i = 0 ; i < 5; i++){
		let x = axes[Math.floor(Math.random()*axes.length)],
			filter = filters[Math.floor(Math.random()*filters.length)],
			data = ['Saumitra', 'Adit', 'Ayush', 'Gaurav', 'Anas', 'Akshay'];

		graphs.push({
			id: i+1,
			x: x,
			filters: [filter],
			data: data,
		})
	}

	return {
		error: false,
		lists: graphs,
	}
}

export const exampleGraph = (graphdata) => {
	const { x, y, filters } = graphdata
	let data = []
	let d = {}
	const sample = [
		[1, 4000, 2400],
		[2, 3000, 1398],
		[3, 2000, 9800],
		[4, 2780, 3908],
		[5, 1890, 4800],
		[6, 2390, 3800],
		[7, 3490, 4300]]

	for(let i = 0 ; i < 7; i++){
		d = {}
		d[x] = sample[i][0]
		d[y] = sample[i][1]
		if(filters.length > 0){
			d[filters[0].name] = sample[i][2]
		}

		data.push(d)
	}

	return data
  }
