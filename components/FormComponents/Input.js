import styled from "@emotion/styled";
import { Box, Input } from "@chakra-ui/react";

const StyledInput = styled(Input)`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1rem")};
  color: #292929;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#f2f2f2"};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 550)};
  border: ${(props) => (props.border ? props.border : "none")};
  border-color: ${(props) =>
    props.error ? props.theme.colors.error : props.theme.colors.mediumGray};
  padding-top: 0.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "0px"};
  padding-bottom: 0.2rem;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "auto")};
  display: flex;
  align-items: center;
  outline: 0;
  &:focus,
  &:hover,
  &:active {
    outline: 0;
    border-color: ${(props) => props.theme.colors.mediumGray};
  }
  &::placeholder {
    font-size: 1rem;
    color: ${(props) => (props.color ? props.color : "#888888")};
    opacity: 0.5;
    letter-spacing: 0.03rem;
    font-weight: 400;
  }
`;

export default StyledInput;
