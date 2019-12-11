import React from 'react';
import styled, { css } from 'styled-components';

var Number = (props) => {

    let Div = styled.div`
    font-size: ${props => props.size}
    `
    let Span = styled.span`
    font-size: ${props => props.size};
    color: ${props => props.color};
    `

    let largeSize = "36px";
    let smallSize = "13px";
    let startPriceIndex = Math.max(props.data.length - 1, 0);
    return (
        <div>
<div id="odometer1" class="odometer">{props.data[startPriceIndex].value}</div>
            <Div size={smallSize}>
                <Span id="amountChange" size={smallSize}>+$0.00</Span> 
                <Span id="percentageChange" size={smallSize}> (+0.00%)</Span>
                <Span size={smallSize} color="grey"> Today</Span>
            </Div>
        </div>
        )
}

export default Number;