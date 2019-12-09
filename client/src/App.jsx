import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './Graph.jsx';
import * as d3 from 'd3'; 
import Number from './Number.jsx';
import styled, { css } from 'styled-components';

class App extends React.Component {

    constructor() {
        super();
        this.changePath = this.changePath.bind(this);

        let data = [];
        let hour = 9;
    
        for(let i = 1; i < 100; i++) {
            if( i % 12 === 0) { hour += 1; }
            data.push({date: new Date(2016, 12, 4, hour, i*5%60), value: Math.random()*5 + 2})
        }

        this.state = {
            graphStatus: "not created",
            data: data,
            stockName: 'Apple'
        };
    }

    componentDidMount() {
        // debugger;
        fetch('http://localhost:3000/stockPrice').then( (data) => {
            return data.json();
        })
        .then( (data) => {
            for(let entry of data[0]) {
                entry.date = new Date(entry.date);
            }
            console.log(data);
            this.setState( {
                graphStatus: "create",
                data: data[0]
            });
        })
    }

    randomData() {
        
    }

    changePath() {
        let data = this.randomData();
        this.setState({
            graphStatus: "update",
            data: data
        })
    }

    render() {
        const Svg = styled.svg``;
        const H1 = styled.h1`
        font-family: "DINPro", -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 36px;
        font-weight: 500;
        letter-spacing: -0.29px;
        line-height: 42px;
        margin: 0;
        `
        const A = styled.a`
        padding-top: 2px;
        padding-bottom: 12px;
        margin: 0 12px;
        font-weight: 500;
        float: left;
        ${props => props.primary && css`
        color: #21ce99;
        border-color: #21ce99;
        `
        }
        `

        return (
        <div>
            <H1>Apple</H1>
            <div>
                <Number />
            </div>
            <svg id="graph">
                <Graph status={this.state.graphStatus} data={this.state.data}/>
            </svg>
            <div>
                <A href="#" primary onClick={this.changePath}>1D</A>
                <A href="#" onClick={this.changePath}>1W</A>
                <A href="#" onClick={this.changePath}>1M</A>
                <A href="#" onClick={this.changePath}>3M</A>
                <A href="#" onClick={this.changePath}>1Y</A>
                <A href="#" onClick={this.changePath}>5Y</A>
            </div>
        </div>
        )
    }
}

export default App;