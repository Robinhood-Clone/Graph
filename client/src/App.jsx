import React from 'react';
import ReactDOM from 'react-dom';
// import * as d3 from 'd3'; 

class Graph extends React.Component {

    constructor() {
        super();
        this.drawGraph.bind(this);
    }

    drawGraph(data) {
        data = [];
        let hour = 9;
        for(let i = 1; i < 100; i++) {
            if( i % 12 === 0) { hour += 1; }
            data.push({date: new Date(2019, 12, 4, hour, i*5%60), value: Math.random()*5 + 2})
        }
        var svgWidth = 600, svgHeight = 400;   
        var margin = { top: 20, right: 20, bottom: 30, left: 50 };   
        var width = svgWidth - margin.left - margin.right;   
        var height = svgHeight - margin.top - margin.bottom;
        var svg = d3.select('svg').attr("width", svgWidth).attr("height", svgHeight);
        var g = svg.append("g").attr("transform",       "translate(" + margin.left + "," + margin.top + ")"   );

        var x = d3.scaleTime().rangeRound([0, width]);
        var y = d3.scaleLinear().rangeRound([height, 0]);
        console.log(x(new Date()), y(Math.random()));
        
        var line = d3.line().x(function(d) { return x(d.date) }).y(function(d) { return y(d.value) });
        x.domain(d3.extent(data, function(d) { return d.date }));
        y.domain([0, 10]);

        g.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
        g.append("g").call(d3.axisLeft(y)).append("text").attr("fill", "#000").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.71em").attr("text-anchor", "end").text("Price ($)");
        g.append("path").datum(data).attr("fill", "none").attr("stroke", "steelblue").attr("stroke-linejoin", "round").attr("stroke-linecap", "round").attr("stroke-width", 1.5).attr("d", line);
    }


    render() {
        this.drawGraph();
        return null;
    }
}

export default Graph;