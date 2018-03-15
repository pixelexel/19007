// /api/getFormVals/
export const formVals = {
	error: false,
	graph: {
		x: ['time', 'average_marks', 'sports_activity', 'cultural_activity'],
		y: ['time', 'sports_activity', 'average_marks', 'cultural_activity'],
		filters: [{
				name: 'no_of_siblings',
				type: 'int'
			},
			{ 
				name: 'parent_salary',
				type: 'currency',
			},
			{
				name:'is_handicapped',
				type: 'bool'
			},
		],
	},
	list: {
		x: ['average_marks', 'sports_activity', 'cultural_activity'],
		filters:  [{
				name: 'no_of_siblings',
				type: 'int'
			},
			{ 
				name: 'parent_salary',
				type: 'currency',
			},
			{
				name:'is_handicapped',
				type: 'bool'
			},
		],
	}
}