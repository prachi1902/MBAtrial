import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Img, Button, IconButton } from "@chakra-ui/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/router";

import { ModalWrapper } from "../library";

function MediaModal({ setIsOpen, isOpen }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      paritialVisibilityGutter: 0,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      paritialVisibilityGutter: 0,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 0,
    },
  };
  const carouselData = [
    {
      id: 1,
      step: "STEP 1",
      title: "Ideal Media Plan",
      text: "Define the Country, Brand and Planning period to identify the ideal media budget required to achieve your media principles targets",
    },
    {
      id: 2,
      step: "STEP 2",
      title: "Optimized Media Plan",
      text: "Provide the received budget, objective functions and other planning factors & constraints to receive an optimized plan designed to maximize KPIs",
    },
    {
      id: 3,
      step: "STEP 3",
      title: "Scenario Planning",
      text: "Experiment with what-if scenarios by simulating your optimized plan, starting from scratching, using LY's plan. You can also validate a pre-created plan",
    },
    {
      id: 4,
      step: "",
      title: "Finalize a Scenario",
      text: "Compare & contrast different scenarios. Finalize and share them with your stakeholders.",
    },
  ];

  const [slideNumber, setSlideNumber] = useState(1);
  const router = useRouter();

  return (
    <ModalWrapper isOpen={isOpen}>
      <Box
        width="45%"
        bg="white"
        position="relative"
        zIndex="1"
        boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
        borderRadius="10px"
      >
        <a href="/new-media">
          <Button
            position="absolute"
            right="35px"
            bottom="39px"
            variant="primary"
            zIndex="9"
            boxShadow="none"
            leftIcon={<Img height="12px" mr="1rem" src="/svg/save.svg" />}
            size="sm"
            width="17%"
          >
            Skip
          </Button>
        </a>
        <Flex
          width="99%"
          height="100%"
          alignItems="center"
          flexDirection="column"
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            px="1.5rem"
            py="1rem"
          >
            <Text flex="0.95" fontSize="1rem">
              Media planning process
            </Text>
            <Text color="grey" mx="0.2rem" fontSize="14px">
              {slideNumber + 1}/4
            </Text>
            <IconButton
              size="sm"
              icon={<Img height="13px" src="/svg/close small.svg" />}
              isRound={true}
              border="none"
              onClick={() => {
                setSlideNumber(1);
                setIsOpen(false);
              }}
              bg="bgGray"
              height="1.5rem"
              width="1.5rem"
            />
          </Flex>
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={true}
            infinite={false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            containerClass="media-modal-carousel-container"
            customRightArrow={
              <CustomRightArrow setSlideNumber={setSlideNumber} />
            }
            customLeftArrow={
              <CustomLeftArrow setSlideNumber={setSlideNumber} />
            }
          >
            {carouselData.map((item, i) => (
              <Flex
                width="99%"
                height="100%"
                alignItems="center"
                flexDirection="column"
                minHeight="20rem"
                key={item.id}
              >
                <Flex height="11rem">
                  <Img
                    mt="1.5rem"
                    height="90%"
                    src={`/svg/carousel${i + 1}.svg`}
                    objectFit="contain"
                  />
                </Flex>
                <Text fontSize="0.9rem" mt="2.5rem" fontWeight="600">
                  {item.step}
                </Text>
                <Text
                  fontSize="1rem"
                  width="65%"
                  textAlign="center"
                  color="primaryRed"
                  fontWeight="500"
                  mt="0.3rem"
                  lineHeight="26px"
                >
                  {item.title}
                </Text>
                <Text
                  fontSize="0.88rem"
                  mt="0.5rem"
                  mb="6rem"
                  textAlign="center"
                  width="62%"
                  lineHeight="18px"
                  color="black"
                >
                  {item.text}
                </Text>
                {i === 3 && (
                  <a href="/new-media">
                    <Button
                      position="absolute"
                      right="43%"
                      bottom="40px"
                      variant="primary"
                      zIndex="9"
                      boxShadow="none"
                      leftIcon={
                        <Img height="12px" mr="1rem" src="/svg/save.svg" />
                      }
                      size="sm"
                      width="17%"
                    >
                      Got it
                    </Button>
                  </a>
                )}
              </Flex>
            ))}
          </Carousel>
        </Flex>
      </Box>
    </ModalWrapper>
  );
}

const CustomRightArrow = ({ carouselState, setSlideNumber, onClick }) => {
  useEffect(() => {
    setSlideNumber(carouselState?.currentSlide);
  }, [carouselState]);
  return (
    <Button
      position="absolute"
      right="43%"
      bottom="40px"
      variant="primary"
      zIndex="9"
      size="sm"
      width="17%"
      onClick={onClick}
      _focus={{
        outline: "none",
      }}
      rightIcon={<Img height="12px" ml="0.75rem" src="/svg/right.svg" />}
    >
      Next
    </Button>
  );
};

const CustomLeftArrow = ({ carouselState, setSlideNumber, onClick }) => {
  useEffect(() => {
    setSlideNumber(carouselState?.currentSlide);
  }, [carouselState]);
  return (
    <IconButton
      icon={<Img src="/svg/left.svg" color="bgGray" />}
      position="absolute"
      color="bgGray"
      left="33%"
      bottom="37px"
      bg="white"
      border="none"
      boxShadow="none"
      zIndex="9"
      onClick={onClick}
      _focus={{
        outline: "none",
      }}
    />
  );
};

export default MediaModal;
