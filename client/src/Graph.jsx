import * as d3 from 'd3';
import React from 'react';

class Graph extends React.Component {

    constructor(props) {
        super(props);

        var widthFull = 676;
        var heightFull = 196;
        var margin = { top: 0, right: 0, bottom: 0, left: 0 };   
        var width = widthFull - margin.left - margin.right;   
        var height = heightFull - margin.top - margin.bottom;

        this.margin = margin;
        this.heightFull = heightFull;
        this.widthFull = widthFull;
        this.width = width;
        this.height = height;
        this.createGraph = this.createGraph.bind(this);
        this.updateGraph = this.updateGraph.bind(this);
        this.parseDate = this.parseData.bind(this);
        
    
    }

    parseData() {
        
        //parse date data into axes scales
        var x = d3.scaleTime().rangeRound([0, this.width]);
        // var x = d3.scaleOrdinal().domain([]).range([0, this.width]); //testing
        var y = d3.scaleLinear().rangeRound([this.height, 0]);
        var line = null;
        var line = d3.line().x(function(d) { return x(d.date) }).y(function(d) { return y(d.value) });
        x.domain(d3.extent(this.props.data, function(d) { return d.date }));
        y.domain(d3.extent(this.props.data, function(d) { return d.value }));

    
        return line;
    }

    createGraph() {
          
        var svg = d3.select('#graph').attr("width", this.widthFull).attr("height", this.heightFull).attr("overflow", "visible");
        var g = svg.append("g").attr("id", "graphGroup").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")" );

        var x = d3.scaleTime().rangeRound([0, this.width]);
        // var x = d3.scaleOrdinal().domain([]).range([0, this.width]); //testing
        var y = d3.scaleLinear().rangeRound([this.height, 0]);
        x.domain(d3.extent(this.props.data, function(d) { return d.date }));
        y.domain(d3.extent(this.props.data, function(d) { return d.value }));

        var line = this.parseData(); 

        // g.append("g").attr("transform", "translate(0," + this.height + ")").style("stroke-dasharray", "5 5").call(d3.axisBottom(x));
        // g.append("g").call(d3.axisLeft(y)).append("text").attr("fill", "#000").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.71em").attr("text-anchor", "end").text("Price ($)");
        let yLastClose = y(this.props.lastEndPrice);
        g.append("line").attr("x1", 0).attr("y1", yLastClose).attr("x2", this.width).attr("y2", yLastClose).attr("stroke-width", 1).attr("stroke", "black").style("stroke-dasharray", "1 5");
        g.append("path").attr("fill", "none").attr("stroke-linejoin", "round").attr("stroke-linecap", "round").attr("stroke-width", 1.5).attr("d", line(this.props.data));

        //add mouse event 
        var focus = g.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("line")
            .attr("class", "x-hover-line hover-line")
            .attr("y1", 0)
            .attr("y2", this.height);

        focus.append("circle")
            .attr("r", 5);

        focus.append("text")
            .attr("class", "trackerText")
            .attr("x", 15)
            .attr("dy", ".31em");
            
            
        svg.append("rect")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
            .attr("class", "overlay")
            .attr("width", this.width)
            .attr("height", this.height)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove.bind(this));
            
            var bisectDate = d3.bisector(function(d) { return d.date; }).left;
        
            function mousemove() {
                var data = this.props.data;
                var x0 = x.invert(d3.mouse(d3.event.currentTarget)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
                console.log(focus.select("text").style().color)
                focus.attr("transform", "translate(" + x(d.date) + "," + y(d.value) + ")");
                focus.select("text").text(function() { return (d.date.format("h:mm A")+ " ET"); });
                focus.select(".x-hover-line").attr("y1", - y(d.value)).attr("y2", this.height - y(d.value)); // - y(d.value)
                // focus.select(".y-hover-line").attr("x2", this.width); 
                
                odometer1.innerHTML = d.value;
                let lastPrice = this.props.lastEndPrice;
                amountChange.innerHTML = (d.value > lastPrice ? "+$" : "-$") + (Math.abs(d.value - lastPrice)).toFixed(2);
                percentageChange.innerHTML = (d.value > lastPrice ? " (+" : "(-") + ((Math.abs(d.value - lastPrice))/lastPrice*100).toFixed(2) + "%)";

            }

    }

    updateGraph() {
        d3.select("#graphGroup").remove();
        this.createGraph();
        // var g = d3.select('g').transition();
        // var rect = d3.select('rect').transition();
        // var line = this.parseData();
        // g.select("path").attr("d", line(this.props.data));
    }


    render() {
        if(this.props.status === "not created") {
            return null;
        } else if(this.props.status === "create") {
            this.createGraph();
            return null;
        }
        this.updateGraph();
        return null;
    }


}

export default Graph;