import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #3f51b5
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  width: 25%;
  height: 5vh;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: #283593
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

function clickMe() {
    alert("You clicked me!");
}

const ConfirmButton = ({ spendAmount, spendAddress, buyAmount, buyAddress, startTrade }) => {
    return (
        <Button
            onClick={startTrade}
        >Confirm Trade
        </Button>
    )
}

export default ConfirmButton;