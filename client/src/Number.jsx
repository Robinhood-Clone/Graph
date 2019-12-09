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
    return (
        <div>
            <div id="odometer1" class="odometer" size="36px">0.00</div>
            <Div size="13px">
                $<Span id="amountChange" size="13px">0.00</Span> 
                (<Span id="percentageChange" size="13px">0.00</Span>)
                <Span size="13px" color="grey"> Today</Span>
            </Div>
        </div>
        )
}

export default Number;