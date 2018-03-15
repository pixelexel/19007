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
