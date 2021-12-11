import React, { useState } from 'react';
import styled from 'styled-components';
import { TokenList } from './Tokens';

const DropDownContainer = styled("div")`
    width: 10.5em;
    margin: 0 auto;
`;

const DropDownHeader = styled("div")`
    margin-bottom: 0.8em;
    padding: 0.4em 0em 0.4em 0em;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    font-weight: 500;
    font-size: 1.3rem;
    color: #3faffa;
    background: #ffffff;
`;

const DropDownListContainer = styled("div")`
    padding-bottom: 10px;
`;

const DropDownList = styled("ul")`
    padding: 0;
    margin: 0;
    background: #ffffff;
    border: 2px solid #e5e5e5;
    box-sizing: border-box;
    color: #3faffa;
    font-size: 1.3rem;
    font-weight: 500;
    &:first-child {
        padding-top: 0.8em;
    }
`;

const ListItem = styled("li")`
    list-style: none;
    margin-bottom: 0.8em;
`;

const DropButton = ({ parentSetter }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
  
    const toggling = () => setIsOpen(!isOpen);
  
    const onOptionClicked = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
        parentSetter(value);
    };
  
    return(
      <DropDownContainer>
          <DropDownHeader onClick={toggling}>
            {selectedOption || "Select Token"}
          </DropDownHeader>
          {isOpen && (
            <DropDownListContainer>
              <DropDownList>
                {TokenList.map(token => (
                  <ListItem onClick={onOptionClicked(token)} key={Math.random()}>
                    {token}
                  </ListItem>
                ))}
              </DropDownList>
            </DropDownListContainer>
          )}
        </DropDownContainer>
    );
};

export default DropButton;