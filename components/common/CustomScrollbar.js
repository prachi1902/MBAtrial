import React, { useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Box } from "@chakra-ui/react";

const CustomScrollbar = ({
  height,
  children,
  horizontal = false,
  vertical = true,
  isFlex = false,
  isHalf = false,
  width,
  autoHide = false,
  background,
}) => {
  useEffect(() => {
    if (document) {
      try {
        const parent = document.getElementById("scrollContent").parentNode;
        if (!horizontal) {
          parent.style.overflowX = "hidden";
        }
        if (!vertical) {
          parent.style.overflowY = "hidden";
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <Scrollbars
      autoHide={autoHide}
      renderThumbHorizontal={() => {
        if (horizontal) {
          return (
            <Box
              bg="#E2BB8A"
              border="solid 2px #B27831"
              width="12px"
              height="12px"
              mt="-4px"
              borderRadius="10px"
            />
          );
        } else {
          return <div />;
        }
      }}
      renderTrackHorizontal={() => {
        if (horizontal) {
          return (
            <Box
              left={isHalf ? "300px" : "0"}
              right={isHalf ? "300px" : "0"}
              height="6px"
              bottom="4px"
              bg="#cccccc"
              position="absolute"
            />
          );
        } else {
          return <div />;
        }
      }}
      renderThumbVertical={() => {
        if (vertical) {
          return (
            <Box
              bg="#E2BB8A"
              border="solid 2px #B27831"
              ml="-3px"
              borderRadius="10px"
            />
          );
        } else {
          return <div />;
        }
      }}
      renderTrackVertical={() => {
        if (vertical) {
          return (
            <Box
              bottom="2px"
              top="2px"
              width="6px"
              right="4px"
              bg="#DDDDDD"
              position="absolute"
            />
          );
        } else {
          return <div />;
        }
      }}
      style={{ height, width, background }}
    >
      <div style={{ display: isFlex ? "flex" : "block" }} id="scrollContent">
        {children}
      </div>
    </Scrollbars>
  );
};

export default CustomScrollbar;
