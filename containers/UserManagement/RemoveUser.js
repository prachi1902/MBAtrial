import React, { useState } from "react";
import {
  Flex,
  Text,
  Img,
  Button,
  Box,
  IconButton,
  Avatar,
} from "@chakra-ui/react";

import { Page } from "@/components/library";

const RemoveUser = ({ setRemoveUser }) => {
  return (
    <Box
      width="100vw"
      height="100vh"
      top="0"
      left="0"
      zIndex="10"
      pt="6rem"
      position="fixed"
      bg="rgba(160,160,160,0.7)"
      css={{ backdropFilter: "blur(4px)" }}
    >
      <Flex
        bg="white"
        flexDirection="column"
        justifyContent="space-between"
        borderRadius="8px"
        width="59%"
        margin="auto"
        px="1.5rem"
        py="0.8rem"
        pb="1.2rem"
        height="24vh"
        background="linear-gradient(90deg, rgba(129,27,26,1) 100%, rgba(0,212,255,0) 100%)"
        borderBottomLeftRadius="0px"
        borderBottomRightRadius="0px"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="500" color="primaryYellow">
            Remove User?
          </Text>
          <IconButton
            icon={<Img src="/svg/close4.svg" />}
            bg="white"
            isRound={true}
            border="none"
            size="sm"
            onClick={() => setRemoveUser(false)}
          />
        </Flex>
        <Flex alignItems="center">
          <Avatar
            size="xl"
            showBorder={false}
            alignSelf="center"
            name="Benjamin Taylor"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.cazXhlya2uyYbQTXwlw3IwHaFH%26pid%3DApi&f=1"
            ml="0.7rem"
            border="solid 2px white"
            mr="2rem"
            boxShadow="0px 2px 2px 0 rgba(0,0,0,0.2)"
          />
          <Box mr="3.5rem">
            <Text color="white" mb="0.1rem">
              Benjamin Taylor
            </Text>
            <Text color="primaryYellow" fontSize="14px" maxWidth="12.5rem">
              benjamin.taylor@abinbev.com
            </Text>
          </Box>
          <Box>
            <Text
              mb="0.1rem"
              textTransform="uppercase"
              color="primaryYellow"
              fontSize="0.85rem"
            >
              access
            </Text>
            <Text color="white" fontSize="14px" maxWidth="12.5rem">
              BU Admin
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Page
        width="59%"
        margin="auto"
        p="2rem"
        borderTopLeftRadius="0px"
        borderTopRightRadius="0px"
        bg="#f2f2f2"
      >
        <Flex alignItems="center" justifyContent="center">
          <Button
            variant="secondary"
            leftIcon={<Img src="/svg/close2.svg" mr="0.7rem" />}
            onClick={() => setRemoveUser(false)}
            mr="1rem"
            width="6.7rem"
            maxHeight="2.25rem"
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            leftIcon={<Img src="/svg/delete2.svg" />}
            onClick={() => setRemoveUser(false)}
            width="8.8rem"
            maxHeight="2.25rem"
            mr="0.7rem"
          >
            Yes, Remove
          </Button>
        </Flex>
      </Page>
    </Box>
  );
};

export default RemoveUser;
