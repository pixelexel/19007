// /api/getFormVals/
export const formVals = {
	error: false,
	graph: {
		x: ["name","no_of_parents","parent_salary","age","handicapped","no_of_siblingss","caste","religion"],
		y: ["name","no_of_parents","parent_salary","age","handicapped","no_of_siblingss","caste","religion"],
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

const getRandom = (min, max) => Math.ceil(Math.random() * (3000 - 1000) + 1000)

// api/get_all_graphs/
export const sampleGraphs = () => {
	let noSamples = 3
	let graphs = []
	let types = ['LINE', 'BAR', 'AREA', 'SCATTER', 'RADAR']
	let axes = ["name","no_of_parents","parent_salary","age","handicapped","no_of_siblingss","caste","religion"]
	let filters = [
					{name: "age", type: "int", op:'<', val: 12},
					{name: "caste", type: "string", op: '=', val: 'Open'},
					{name: "handicapped", type: "bool", 'op': '=', val: 'True'},
					{name: "name", type: "string", 'op': '=', 'val': 'Saumitra'},
					{name: "no_of_parents", type: "int", 'op': '=', 'val': 2},
					{name: "no_of_siblingss", type: "int", 'op': '<', 'val': 3},
					{name: "parent_salary", type: "int", 'op': '>=', val: 30000},
					{name: "religion", type: "string", 'op': '=', val: 'Hindu'},
				]

	for(let i = 0 ; i < noSamples; i++){
		let x = axes[Math.floor(Math.random()*axes.length)],
			y = axes[Math.floor(Math.random()*axes.length)],
			filter = filters[Math.floor(Math.random()*filters.length)],
			type = types[Math.floor(Math.random()*types.length)],
			data = [];

		let d = {}
		for(let j = 0 ; j < 10; j ++){
			d = {}
			d[x] = j+1
			d[y] = Math.ceil(Math.random() * (3000 - 1000) + 1000)
			d[`${filter.name}${filter.op}${filter.val}`] = Math.ceil(Math.random() * (3000 - 1000) + 1000)
			data.push(d)
		}

		graphs.push({
			name: 'Hello Graphs!',
			id: i+1,
			x: x,
			y: y,
			filters: [filter],
			data: data,
			type: type,
		})
	}

	return {
		error: false,
		graphs: [],
	}
}

export const sampleLists = () => {
	const noSamples = 2
	let graphs = []
	let axes = ["name","no_of_parents","parent_salary","age","handicapped","no_of_siblingss","caste","religion"]
	let filters = [
					{name: "age", type: "int", op:'<', val: 12},
					{name: "caste", type: "string", op: '=', val: 'Open'},
					{name: "handicapped", type: "bool", 'op': '=', val: 'True'},
					{name: "name", type: "string", 'op': '=', 'val': 'Saumitra'},
					{name: "no_of_parents", type: "int", 'op': '=', 'val': 2},
					{name: "no_of_siblingss", type: "int", 'op': '<', 'val': 3},
					{name: "parent_salary", type: "int", 'op': '>=', val: 30000},
					{name: "religion", type: "string", 'op': '=', val: 'Hindu'},
				]

	for(let i = 0 ; i < noSamples; i++){
		let x = axes[Math.floor(Math.random()*axes.length)],
			filter = filters[Math.floor(Math.random()*filters.length)],
			data = ['Saumitra', 'Adit', 'Ayush', 'Gaurav', 'Anas', 'Akshay', 'Batman', 'Superman', 'Shaktiman'];

		graphs.push({
			name: 'Hello Lists',
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

	for(let i = 0 ; i < 7; i++){
		d = {}
		d[x] = i + 1
		d[y] = getRandom(1000, 10000)

		for(let j in filters){
			const filter = filters[j]
			d[`${filter.name}${filter.op}${filter.val}`] = getRandom(1000, 10000)
		}

		data.push(d)
	}

	return []
  }




export const studentData = () =>{
	const data = [
	    { subject: 'Math', A: 120, fullMark: max },
	    { subject: 'Chinese', A: 98, fullMark: max },
	    { subject: 'English', A: 86, fullMark: max },
	    { subject: 'Geography', A: 99, fullMark: max },
	    { subject: 'Physics', A: 85, fullMark: max },
	    { subject: 'History', A: 65, fullMark: max },
	];
	const  acad_data  = [{name: '2010', uv: 3400, amt: 2400},
	      {name: '2011', uv: 2700, amt: 2210},
	      {name: '2012', uv: 1600, amt: 2290},
	      {name: '2013', uv: 2780, amt: 2000},
	      {name: '2014', uv: 2790, amt: 2181},
	      {name: '2015', uv: 3790, amt: 2500},
	];
	const  sport_data  = [{name: '2010', uv: 4000, amt: 2400},
	      {name: '2011', uv: 3000, amt: 2210},
	      {name: '2012', uv: 2000, amt: 2290},
	      {name: '2013', uv: 2780, amt: 2000},
	      {name: '2014', uv: 1890, amt: 2181},
	      {name: '2015', uv: 2390, amt: 2500},
	];
	const  c_data  = [{name: '2010', uv: 2000, amt: 2400},
	      {name: '2011', uv: 3200, amt: 2210},
	      {name: '2012', uv: 4000, amt: 2290},
	      {name: '2013', uv: 5480, amt: 2000},
	      {name: '2014', uv: 3190, amt: 2181},
	      {name: '2015', uv: 1290, amt: 2500},
	];
	const  d_data  = [{name: '2010', uv: 3600, amt: 2400},
	      {name: '2011', uv: 6000, amt: 2210},
	      {name: '2012', uv: 4000, amt: 2290},
	      {name: '2013', uv: 1980, amt: 2000},
	      {name: '2014', uv: 3990, amt: 2181},
	      {name: '2015', uv: 2990, amt: 2500},
	];

	const rank_data = [
	      {name: 'Page A', uv: 2, pv: 8},
	  
	];


	return {
		data: data,
		acad_data: acad_data,
		sport_data: sport_data,
		c_data: c_data,
		d_data: d_data,
	}

}