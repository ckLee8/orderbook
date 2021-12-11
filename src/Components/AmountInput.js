import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FieldContainer = styled("div")`
`;

const InputText = styled("input")`
width: 95%;
height: 50px;
border-radius: 4px;
position: relative;
text-align:center;
font-size: 24px;
`;

const AmountInput = ({ setAmount }) => {
  const[inputVal, setInputVal] = useState();
  
  useEffect(() => {
    setAmount(inputVal);
  }, [inputVal]);

  return(
    <FieldContainer>
      <InputText
        placeholder="Amount"
        value={inputVal}
        onChange={(e) => {
            if(e.target.value === "") {
                e.target.placeholder = "Amount"
            }
            setInputVal(e.target.value);
        }}
        onClick={e => e.target.placeholder = ""}
      />
    </FieldContainer>
  );
};

export default AmountInput;