import React from "react";
import styled from "@emotion/styled";

const Input = styled.input`
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "white"};
  border: ${(props) => (props.border ? props.border : "none")};
  border-radius: 50%;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: ${(props) => (props.width ? props.width : "18px")};
  height: ${(props) => (props.width ? props.width : "18px")};
  cursor: pointer;
  outline: none;

  :checked {
    background: ${(props) =>
      props.onCheckBG
        ? `${props.onCheckBG} url("/svg/selected white.svg") 3.5px 5.5px  no-repeat`
        : "linear-gradient(180deg, #FCD5A5 0%, #F9AA4A 100%) url('/svg/selected white.svg') 3.5px 5.5px  no-repeat"};

    background: ${(props) =>
      props.compareScenario &&
      props.onCheckBG &&
      `${props.onCheckBG} url("/svg/selected white.svg") 6.5px 8px no-repeat`};

    backgroud-image: ${(props) =>
      props.black ? "/svg/selected black.svg" : "/svg/selected white.svg"};
  }
`;

const CircularCheckbox = React.forwardRef((props, ref) => {
  return <Input type="checkbox" ref={ref} {...props} />;
});

export default CircularCheckbox;
