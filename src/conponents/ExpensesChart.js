import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import history from '../utils/history';
import "../css/expensesChart.css";

const data = [
	{ category: 'House', count: 590 },
	{ category: 'Food', count: 291 },
	{ category: 'Family', count: 348 },
	{ category: 'Transport', count: 145 },
	{ category: 'Health', count: 46 },
	{ category: 'Beauty', count: 46 },
	{ category: 'Rest', count: 46 },
	{ category: 'Other', count: 46 },
	{ category: 'All budget', count: 46 },
	/// all data by expense category////
]

// const data = [
// 	{ category: 'House', count: 0 },
// 	{ category: 'Food', count: 0 },
// 	{ category: 'Family', count: 0 },
// 	{ category: 'Transport', count: 0 },
// 	{ category: 'Health', count: 0 },
// 	{ category: 'Beauty', count: 0 },
// 	{ category: 'Rest', count: 0 },
// 	{ category: 'Other', count: 0 },
// 	{ category: 'All budget', count: 0 },
// 	/// all data by expense category////
// ]

console.log(data);
function getData() {
	if(localStorage.listArrayExpenses && localStorage.listArrayExpenses.length){
		let listArrayExpenses = JSON.parse(localStorage.getItem('listArrayExpenses'));
		console.log(listArrayExpenses);
		data.map((obj, index) => {
			let count = 0;
			listArrayExpenses.map((obj2, index2)=>{
				if(data[index].category === obj2.category){
					count+= +obj2.amount;
				};
				console.log(data[index].category, " : ", count);
				data[index].count = count;
			});		
		});
	}
}


function onHandleClick(event) {
	history.push("/expenses");
}

const ExpensesChart = () => {

	useEffect(()=>{
		getData();
	})

	const pieChart = useRef();

	useEffect(() => {

		// Get positions for each data object
		const piedata = d3.pie().value(d => d.count)(data)
		// Define arcs for graphing 
		const arc = d3.arc().innerRadius(0).outerRadius(200)

		// const colors = d3.scaleOrdinal(['#ffa822', '#134e6f', '#ff6150', '#1ac0c6', '#dee0e6'])
		const colors = d3.scaleOrdinal(['#ffa822', '#134e6f', '#ff6150', '#1ac0c6', '#dee0e6', '#31ff22', '#d722ff', '#fff522', '#2287ff'])

		// Define the size and position of svg
		const svg = d3.select(pieChart.current)
			.attr('width', 600)
			.attr('height', 600)
			// .style('background-color','yellow')
			.append('g')
			.attr('transform', 'translate(300,300)')

		// Add tooltip
		const tooldiv = d3.select('#chartArea')
			.append('div')
			.style('visibility', 'hidden')
			.style('position', 'absolute')
			.style('background-color', 'red')


		// Draw pie
		svg.append('g')
			.selectAll('path')
			.data(piedata)
			.join('path')
			.attr('d', arc)
			.attr('fill', (d, i) => colors(i))
			.attr('stroke', 'white')
			.on('mouseover', (e, d) => {
				console.log(e)
				console.log(d)

				tooldiv.style('visibility', 'visible')
					.text(`${d.data.category}:` + `${d.data.count}`)
			})
			.on('mousemove', (e, d) => {
				tooldiv.style('top', (e.pageY - 50) + 'px')
					.style('left', (e.pageX - 50) + 'px')
			})
			.on('mouseout', () => {
				tooldiv.style('visibility', 'hidden')
			})

	})

	return (
		<div id='chartArea'>
			<div className="expense-header">
				<button onClick={onHandleClick}>back</button >Expenses Chart
			</div>
			{data? <svg ref={pieChart}></svg> : <p>Nothing was found</p>}
			<div className="category-history">
				<p id="House">House: </p>
				<p id="Food">Food: </p>
				<p id="Family">Family:</p>
				<p id="Transport">Transport:</p>
				<p id="Health">Health:</p>
				<p id="Beauty">Beauty:</p>
				<p id="Rest">Rest:</p>
				<p id="Other">Other:</p>
				<p id="All_budget">All budget:</p>
			</div>
		</div>
	)
}

export default ExpensesChart;
