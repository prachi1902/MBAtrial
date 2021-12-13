import React from "react";
import ReactSwitch from "react-switch";

import { Img } from "@chakra-ui/react";
import styled from "@emotion/styled";

const StyledSwitch = styled(ReactSwitch)`
  .react-active-switch .react-switch-bg {
    background-color: transparent !important;
  }
  .react-switch-bg {
    background-color: transparent !important;
    border: ${(props) =>
      props.checked ? "solid 1px #2A9872" : "solid 1px #811B1A"};
  }
`;

const Switch = ({ defColor = "black", ...props }) => {
  return (
    <StyledSwitch
      onColor="#2A9872"
      offColor="#811B1A"
      uncheckedIcon={false}
      checkedIcon={false}
      checkedHandleIcon={<Img src="/svg/toggle_circle_green.svg" />}
      uncheckedHandleIcon={<Img src="/svg/toggle_circle.svg" />}
      height={12}
      handleDiameter={8}
      width={22}
      className="react-active-switch"
      {...props}
    />
  );
};

export default Switch;
