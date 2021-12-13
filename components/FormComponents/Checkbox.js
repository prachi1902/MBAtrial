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
  width: ${(props) => (props.width ? props.width : "18px")};
  height: ${(props) => (props.height ? props.height : "18px")};
  cursor: pointer;
  outline: none;
  border: ${(props) => props.inviteUser && "solid 1px #D7A669"};

  :checked {
    border: solid 1px #821e1c;
    border-width: ${(props) => (props.borderWidth ? props.borderWidth : "1px")};
    background: ${(props) =>
      props.secondaryVariant
        ? "url('/svg/select row.svg') 1.4px 3.5px no-repeat"
        : "#821e1c url('data:image/gif;base64,R0lGODlhCwAKAIABAP////3cnSH5BAEKAAEALAAAAAALAAoAAAIUjH+AC73WHIsw0UCjglraO20PNhYAOw==') 2.4px 3px no-repeat"};

    background: ${(props) =>
      props.selectAll &&
      "#821e1c url('/svg/multirows selected.svg') 2.8px 6px no-repeat"};

    background: ${(props) =>
      props.inviteUser &&
      "#FBCB90 url('/svg/small tick.svg') 2.8px 5px no-repeat"};
  }
`;

const Checkbox = React.forwardRef((props, ref) => {
  return <Input type="checkbox" ref={ref} {...props} />;
});

export default Checkbox;
