import React, { useState } from "react";
import {
  Flex,
  Text,
  Img,
  Box,
  IconButton,
  Skeleton,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { Section, Page } from "@/components/library";
import PresentGraph from "@/components/ExecutiveDashboard/MyDeck/PresentGraph";

const GraphSection = ({ slidesData, loading }) => {
  const [slideNumber, setSliderNumber] = useState(0);
  const handle = useFullScreenHandle();
  const [fullScreen, setFullScreen] = useState(false);

  const prevSlide = () => {
    setSliderNumber(slideNumber - 1);
  };
  const nextSlide = () => {
    setSliderNumber(slideNumber + 1);
  };

  return (
    <Section mt="1rem">
      <FullScreen
        onChange={(props) => {
          setFullScreen(props);
        }}
        handle={handle}
      >
        {fullScreen && (
          <PresentGraph
            slidesData={slidesData}
            slideNumber={slideNumber}
            setSliderNumber={setSliderNumber}
            handle={handle}
          />
        )}
      </FullScreen>
      <Page pt="0.75rem" pb="0.5rem" px="0.5rem">
        {loading ? (
          <Skeleton width="1250px" height="280px" />
        ) : slidesData.length ? (
          <>
            <Flex justifyContent="space-between" alignItems="center" mb="1rem">
              <Flex minW="200px" alignItems="center" ml="1rem">
                <IconButton
                  icon={<Img src="/svg/left.svg" />}
                  bg="lightGray"
                  border="none"
                  isRound={true}
                  mr="0.5rem"
                  size="sm"
                  onClick={() => {
                    if (slideNumber) prevSlide();
                  }}
                />
                <Text mr="0.5rem">
                  {slideNumber + 1}/{slidesData?.length}
                </Text>
                <IconButton
                  icon={<Img src="/svg/right.svg" />}
                  bg="lightGray"
                  border="none"
                  isRound={true}
                  size="sm"
                  onClick={() => {
                    if (slideNumber + 1 < slidesData?.length) nextSlide();
                  }}
                />
              </Flex>
              <Text ml="-3rem" fontSize="0.95rem" letterSpacing="0.03rem">
                {slidesData[slideNumber]?.page_title}
              </Text>
              <Flex alignItems="center" mr="0.5rem">
                <Button
                  onClick={() => {
                    handle.enter();
                    setFullScreen(true);
                  }}
                  mr="1rem"
                  leftIcon={<Img src="/svg/present.svg" />}
                >
                  Present
                </Button>
                <Tooltip label="Edit">
                  <IconButton
                    icon={<Img src="/svg/edit.svg" />}
                    mr="0.5rem"
                    bg="none"
                    border="none"
                  />
                </Tooltip>
                <Tooltip label="Delete">
                  <IconButton
                    icon={<Img src="/svg/delete2.svg" />}
                    bg="none"
                    border="none"
                  />
                </Tooltip>
              </Flex>
            </Flex>
            <Box mb="2rem">
              {slidesData[slideNumber]?.page_pic ? (
                <Img
                  width="1250px"
                  height="280px"
                  maxWidth="100%"
                  src={`data:image/png;base64,${slidesData[slideNumber]?.page_pic}`}
                />
              ) : null}
            </Box>
            <Box
              bg="bgGray"
              px="1rem"
              py="1.5rem"
              borderRadius="6px"
              height="10rem"
            >
              <Text>{slidesData[slideNumber]?.page_note}</Text>
            </Box>
          </>
        ) : (
          <Text>No Graphs added to Your Deck</Text>
        )}
      </Page>
    </Section>
  );
};

export default GraphSection;
