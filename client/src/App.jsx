import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './Graph.jsx';
import * as d3 from 'd3';
import Number from './Number.jsx';
import styled, { css } from 'styled-components';
import moment from 'moment';
import 'moment-timezone';

class App extends React.Component {

    constructor(props) {
        super();
        this.changePath = this.changePath.bind(this);

        let urlArr = (window.location.href).split("/");
        let stockSymbol = "MMM";
        console.log(urlArr);
        if (urlArr.length === 6) {
            stockSymbol = urlArr[urlArr.length - 2];
        }

        this.state = {
            graphStatus: "not created",
            data: [{ value: 0.00 }],
            fullData: [{ value: 0.00 }],
            stockName: "",
            stockSymbol: stockSymbol,
            lastEndPrice: 0.00
        };




    }

    componentDidMount() {
        let stockName = "";
        fetch('http://18.189.28.184/stockName/' + this.state.stockSymbol)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                stockName = data[0][0].name;
                console.log(data, stockName);
            })
            .then(() => {
                return fetch('http://18.189.28.184/stockInfo/' + this.state.stockSymbol)
            })
            .then((data) => {
                console.log("data before");
                return data.json();
            })
            .then((data) => {

                let index = 0;
                console.log("date data:", data);
                // let today = new Date();
                // if (today.getHours() < 9) {
                //     today.setDate(today.getDate() - 1)
                // }
                let today = moment().utc();
                if (today.hours() < 9) {
                    today.subtract(1, 'd');
                }



                // for (let entry of data[index]) {
                //     entry.date = new Date(entry.date);
                // }
                for (let entry of data[index]) {
                    entry.date = moment(entry.date).utc();
                }



                let dayData = data[index].filter((stockPrice) => {
                    // return stockPrice.date.toDateString() === today.toDateString()
                    return (stockPrice.date.dayOfYear() === today.dayOfYear() && stockPrice.date.year() === today.year())
                });
                console.log("daydata after", dayData);
                let startData = dayData[0].value;
                let endData = dayData[dayData.length - 1].value;
                let closedTime = 18;
                if(startData > endData && moment().tz('America/New_York').hours() < closedTime) {
                    document.getElementById("globalstyle").href = "http://18.189.28.184/stylesOpenOrange.css";
                } else if (startData < endData && moment().tz('America/New_York').hours() < closedTime) {
                    document.getElementById("globalstyle").href = "http://18.189.28.184/stylesOpenGreen.css";
                } else if (startData > endData && moment().tz('America/New_York').hours() >= closedTime) {
                    document.getElementById("globalstyle").href = "http://18.189.28.184/stylesClosedOrange.css";
                } else if (startData < endData && moment().tz('America/New_York').hours() >= closedTime) {
                    document.getElementById("globalstyle").href = "http://18.189.28.184/stylesClosedGreen.css";
                }

                this.setState({
                    graphStatus: "create",
                    data: dayData,
                    fullData: data[index],
                    lastEndPrice: dayData[0].value,
                    stockName: stockName
                });
            })
    }

    changePath(timeframe) {
        let data = this.state.fullData;

        // let today = new Date();
        // if (today.getHours() < 9) {
        //     today.setDate(today.getDate() - 1)
        // }
        let today = moment().utc();
        if (today.hours() < 9) {
            today.subtract(1, 'd');
        }


        let finalData = []

        switch (timeframe) {
            case 'D':
                finalData = data.filter((stockPrice) => {
                    // return stockPrice.date.toDateString() === today.toDateString()
                    return (stockPrice.date.dayOfYear() === today.dayOfYear() && stockPrice.date.year() === today.year())
                });
                break;
            case 'W':
                finalData = data.filter((stockPrice) => {
                    let weekAgo = moment().utc();
                    weekAgo.subtract(7, 'd');
                    return (stockPrice.date.minutes() % 10 === 0) &&
                        stockPrice.date <= today && stockPrice.date >= weekAgo;
                });
                break;
            case 'M':
                finalData = data.filter((stockPrice) => {
                    let monthAgo = moment().utc();
                    monthAgo.subtract(1, 'months');
                    return (stockPrice.date.minutes() === 0) &&
                        stockPrice.date <= today && stockPrice.date >= monthAgo;
                });
                break;
            case '3M':
                finalData = data.filter((stockPrice) => {
                    let threeMonthAgo = moment().utc();
                    threeMonthAgo.subtract(3,'months');
                    return (stockPrice.date.minutes() === 0) &&
                        stockPrice.date <= today && stockPrice.date >= threeMonthAgo;
                });
                break;
            case 'Y':
                finalData = data.filter((stockPrice) => {
                    let yearAgo = moment().utc();
                    yearAgo.subtract(1, 'years');
                    return (stockPrice.date.minutes() === 0 && stockPrice.date.hours() === 16) &&
                        stockPrice.date <= today && stockPrice.date >= yearAgo;
                });
                break;
            case '5Y':
                finalData = data.filter((stockPrice) => {
                    let yearAgo = moment().utc();
                    yearAgo.subtract(1, 'years');
                    return (stockPrice.date.minutes() === 0 && stockPrice.date.hours() === 16) &&
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

        return (
            <div>
                <HeaderButtons>
                    <H1>{this.state.stockName}</H1>
                    <InfoButtons duration="500" offset="-100" smooth="easeOutCubic" href="#">
                        <InfoButton>
                            <InfoContent>
                                <Icon width="20" height="20" viewBox="0 0 20 20">
                                    <IconPic fill-rule="evenodd" transform="translate(-4 -4)"><path id="tag-a" d="M20.99975,8 C20.44775,8 19.99975,7.552 19.99975,7 C19.99975,6.448 20.44775,6 20.99975,6 C21.55175,6 21.99975,6.448 21.99975,7 C21.99975,7.552 21.55175,8 20.99975,8 M21.99975,4 L14.82775,4 C14.29775,4 13.78875,4.21 13.41375,4.585 L4.58575,13.414 C3.80475,14.195 3.80475,15.461 4.58575,16.242 L11.75675,23.414 C12.53775,24.195 13.80475,24.195 14.58575,23.414 L23.41375,14.586 C23.78875,14.211 23.99975,13.702 23.99975,13.172 L23.99975,6 C23.99975,4.896 23.10375,4 21.99975,4"></path></IconPic>
                                </Icon>
                                <span>56% Buy</span>
                            </InfoContent>
                        </InfoButton>
                        <InfoButton>
                            <InfoContent>
                                <Icon width="12" height="14" viewBox="0 0 12 14">
                                    <IconPic fill-rule="evenodd"><ellipse cx="6" cy="3.5" rx="3.333" ry="3.5"></ellipse><path d="M4.224,8.4 L7.776,8.4 L7.776,8.4 C10.1088508,8.4 12,10.2911492 12,12.624 L12,14 L0,14 L0,12.624 L8.8817842e-16,12.624 C6.02486595e-16,10.2911492 1.89114922,8.4 4.224,8.4 Z"></path></IconPic>
                                </Icon>
                                <span>207,060</span>
                            </InfoContent>
                        </InfoButton>
                    </InfoButtons>
                </HeaderButtons>
                <div>
                    <Number data={this.state.data} />
                </div>
                <svg id="graph">
                    <Graph status={this.state.graphStatus} data={this.state.data} lastEndPrice={this.state.lastEndPrice} />
                </svg>
                <Nav>
                    <A href="#" primary onClick={() => this.changePath('D')}>1D</A>
                    <A href="#" onClick={() => this.changePath('W')}>1W</A>
                    <A href="#" onClick={() => this.changePath('M')}>1M</A>
                    <A href="#" onClick={() => this.changePath('3M')}>3M</A>
                    <A href="#" onClick={() => this.changePath('Y')}>1Y</A>
                    <A href="#" onClick={() => this.changePath('5Y')}>5Y</A>
                </Nav>
            </div>
        )
    }
}

const Svg = styled.svg``;
const H1 = styled.h1`
justify-content: flex-start;
display: inline-flex;
font-family: "DINPro", -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 36px;
font-weight: 500;
letter-spacing: -0.29px;
line-height: 42px;
margin: 0;
`
const HeaderButtons = styled.div`
display: flex;
align-items: center;
flex-direction: row;
flex-wrap: nowrap;
justify-content: space-between;
width: 676px;
`;

const InfoButtons = styled.a`
text-decoration: none;
display: inline-block;
justify-content: flex-end;
margin: 10px 0 0 9px;
`;


const InfoButton = styled.div`
display: inline-block;
justify-content: flex-end;
margin: 10px 0 0 9px;
background-color: rgb(244,244,245);
color: black;
border-radius: 10px;
&:hover {
    color: white;
    background-color: black;
}
`;

const InfoContent = styled.span`
font-size: 13px;
letter-spacing: 0.25px;
line-height: 19px;
align-items: center;
border-radius: 17px;
display: inline-flex;
height: 28px;
overflow: hidden;
padding: 0 12px 1px;
`;

const Icon = styled.svg`
font-size: 13px;
letter-spacing: 0.25px;
line-height: 19px;
height: 12px;
width: 12px;
`;

const IconPic = styled.g`
fill-rule: evenodd;
fill: black;

&:hover {
    fill: white;
}
`

const Nav = styled.nav`
border-bottom: 1px solid rgb(244,244,245);
margin: 24px 0 12px;
display: flex;
align-items: center;
height: 33px;
width: 676px;
justify-content: flex-start;
`;

const A = styled.a`
text-decoration: none;
padding-top: 2px;
padding-bottom: 12px;
margin: 0px 24px 0px 0px;
font-weight: 500;
float: left;
font-size: 13px;

${props => props.primary && css`
color: #21ce99;
bottom-border: #21ce99;
`}
`

export default App;
