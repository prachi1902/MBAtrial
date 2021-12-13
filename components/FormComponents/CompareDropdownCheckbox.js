import React from "react";
import styled from "@emotion/styled";

const Input = styled.input`
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "white"};
  border: solid 1px #898989;
  border-radius: 4px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  cursor: pointer;
  outline: none;

  :checked {
    background: url("/svg/small tick.svg") 7px 7px,
      linear-gradient(180deg, #fcd5a5 0%, #f9aa4a 100%);
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const CheckBox = React.forwardRef((props, ref) => {
  return <Input type="checkbox" ref={ref} {...props} />;
});

export default CheckBox;
