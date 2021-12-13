import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { Flex, Text, Img, Box, FormLabel } from "@chakra-ui/react";

function Slider() {
  const STEP = 1;
  const MIN = 0;
  const MAX = 100;

  //   const state = {
  //     values: [50],
  //   };

  const [values, setValues] = useState([70]);

  return (
    <Flex
      //   border="2px solid blue"
      justifyContent="center"
      flexWrap="wrap-reverse"
      margin="0rem"
      ml="1rem"
      width="50%"
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <Box
            mb="0.6rem"
            // border="2px solid red"
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <Box
              //   border="2px solid yellowgreen"
              ref={props.ref}
              style={{
                height: "7px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: values,
                  colors: ["#ccc", "#ccc"],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </Box>
          </Box>
        )}
        renderThumb={({ props, isDragged }) => (
          <Box
            {...props}
            style={{
              ...props.style,
              height: "38px",
              width: "15px",
              borderRadius: "4px",
              background: "linear-gradient(180deg, #FCD5A5 0%, #F9AA4A 100%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
              outline: "none",
            }}
          ></Box>
        )}
      />
      <Flex
        // border="2px solid purple"
        mb="-6rem"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
      >
        <Text fontSize="0.7rem" color="grey">
          ROI
        </Text>
        <Text fontSize="0.7rem" color="grey">
          ATTENTION
        </Text>
      </Flex>
      <Flex
        mt="0rem"
        mb="-3.5rem"
        alignItems="center"
        // border="2px solid black"
        width="100%"
        justifyContent="space-between"
      >
        <output id="output">{values[0]?.toFixed(0)}%</output>
        <output id="output">{100 - values[0]?.toFixed(0)}%</output>
      </Flex>
    </Flex>
  );
}

export default Slider;
