import React, { useState } from "react";
import { Container, Section, Page } from "../library";
import { Flex, Text, Img, Box, Button, IconButton } from "@chakra-ui/react";

const Popup = ({
  imgSrc,
  flexProps,
  textProps,
  text,
  setShowPopup,
  closeButton = true,
  comingSoon,
  ...props
}) => {
  return (
    <Section>
      <Page mt="1rem" bg="#fafafa" py="1rem" px="1.5rem" {...props}>
        <Flex alignItems="center" justifyContent="space-between">
          <Img src={imgSrc} height="7rem" pl="4rem" />
          <Flex {...flexProps}>
            <Text textAlign="center" {...textProps}>
              {text}
            </Text>
          </Flex>
          <Flex direction="column" align="center" width="10rem">
            {comingSoon && (
              <Text
                borderRadius="5px"
                color="white"
                px="0.5rem"
                py="0.1rem"
                bg="#6D7278"
                mb="1rem"
                fontSize="0.875rem"
              >
                Coming Soon
              </Text>
            )}
            {closeButton && (
              <IconButton
                mb="2rem"
                size="md"
                icon={<Img height="13px" src="/svg/close small.svg" />}
                isRound={true}
                border="none"
                onClick={() => setShowPopup(false)}
                bg="bgGray"
                height="1.5rem"
                width="1.5rem"
              />
            )}
          </Flex>
        </Flex>
      </Page>
    </Section>
  );
};

export default Popup;
