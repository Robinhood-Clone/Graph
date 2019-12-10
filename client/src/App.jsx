import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './Graph.jsx';
import * as d3 from 'd3';
import Number from './Number.jsx';
import styled, { css } from 'styled-components';
import moment from 'moment';

class App extends React.Component {

    constructor() {
        super();
        this.changePath = this.changePath.bind(this);

        this.state = {
            graphStatus: "not created",
            data: [],
            fullData: [],
            stockName: 'Apple'
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/stockPrice').then((data) => {
            return data.json();
        })
            .then((data) => {
                let today = new Date();
                if (today.getHours() < 9) {
                    today.setDate(today.getDate() - 1)
                }
                for (let entry of data[0]) {
                    entry.date = new Date(entry.date);
                }
                let dayData = data[0].filter((stockPrice) => {
                    return stockPrice.date.toDateString() === today.toDateString()
                });
                console.log(dayData);
                this.setState({
                    graphStatus: "create",
                    data: dayData,
                    fullData: data[0]
                });
            })
    }

    changePath(timeframe) {
        let data = this.state.fullData;
        let today = new Date();
        if (today.getHours() < 9) {
            today.setDate(today.getDate() - 1)
        }
        let finalData = []

        switch (timeframe) {
            case 'D':
                finalData = data.filter((stockPrice) => {
                    return stockPrice.date.toDateString() === today.toDateString()
                });
                break;
            case 'W':
                finalData = data.filter((stockPrice) => {
                    let weekAgo = new Date();
                    weekAgo.setDate(today.getDate() - 7);
                    return (stockPrice.date.getMinutes() % 10 === 0) &&
                        stockPrice.date <= today && stockPrice.date >= weekAgo;
                });
                break;
            case 'M':
                finalData = data.filter((stockPrice) => {
                    let monthAgo = new Date();
                    monthAgo.setDate(today.getDate() - 30);
                    return (stockPrice.date.getMinutes() === 0) &&
                        stockPrice.date <= today && stockPrice.date >= monthAgo;
                });
                break;
            case '3M':
                finalData = data.filter((stockPrice) => {
                    let threeMonthAgo = new Date();
                    threeMonthAgo.setDate(today.getDate() - 90);
                    return (stockPrice.date.getMinutes() === 0) &&
                        stockPrice.date <= today && stockPrice.date >= threeMonthAgo;
                });
                break;
            case 'Y':
                finalData = data.filter((stockPrice) => {
                    let yearAgo = new Date();
                    yearAgo.setDate(today.getDate() - 30);
                    return (stockPrice.date.getMinutes() === 0 && stockPrice.date.getHours() === 16) &&
                        stockPrice.date <= today && stockPrice.date >= yearAgo;
                });
                break;
            case '5Y':
                finalData = data.filter((stockPrice) => {
                    let yearAgo = new Date();
                    yearAgo.setDate(today.getDate() - 30);
                    return (stockPrice.date.getMinutes() === 0 && stockPrice.date.getHours() === 16) &&
                        stockPrice.date <= today && stockPrice.date >= yearAgo;
                });
                break;
            default:
        }
        this.setState({
            graphStatus: "update",
            data: finalData
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
                    <Graph status={this.state.graphStatus} data={this.state.data} />
                </svg>
                <div>
                    <A href="#" primary onClick={() => this.changePath('D')}>1D</A>
                    <A href="#" onClick={() => this.changePath('W')}>1W</A>
                    <A href="#" onClick={() => this.changePath('M')}>1M</A>
                    <A href="#" onClick={() => this.changePath('3M')}>3M</A>
                    <A href="#" onClick={() => this.changePath('Y')}>1Y</A>
                    <A href="#" onClick={() => this.changePath('5Y')}>5Y</A>
                </div>
            </div>
        )
    }
}

export default App;