import React, { useState } from "react";
import {
  Flex,
  Text,
  Img,
  Button,
  Box,
  IconButton,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Page } from "../../library";
import { InputBudget, TextArea } from "@/components/FormComponents";

const AddToMyDeckModal = ({ setShowAddModal }) => {
  const { register, watch } = useForm();

  return (
    <Box
      width="100vw"
      height="100vh"
      top="0"
      left="0"
      zIndex="10"
      pt="4rem"
      position="fixed"
      bg="rgba(160,160,160,0.7)"
      css={{ backdropFilter: "blur(4px)" }}
    >
      <Page
        width="89%"
        p="0"
        height="46vh"
        borderBottomRadius="0px"
        boxShadow="none"
      >
        <Box p="1.5rem" px="1.5rem">
          <Flex justifyContent="space-between" alignItems="center" mb="4rem">
            <Text>My deck</Text>
            <InputGroup
              bg="#e8e8e8"
              width="58%"
              borderRadius="5px"
              height="35px"
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
            >
              <InputLeftAddon
                color="gray"
                height="auto"
                textTransform="uppercase"
                fontSize="0.85rem"
                letterSpacing="0.03rem"
                bg="none"
                border="none"
              >
                page title
              </InputLeftAddon>
              <InputBudget
                height="25px"
                width="85%"
                textAlign="center"
                flexProps={{ bg: "#e8e8e8", border: "none" }}
                flexInsideProps={{ width: "100%" }}
                inputProps={{ width: "100%", border: "none" }}
              />
            </InputGroup>
            <Flex alignItems="center">
              <Button
                variant="primary"
                leftIcon={<Img src="/svg/save.svg" mr="0.3rem" />}
                onClick={() => {
                  setShowAddModal(false);
                }}
                fontSize="0.95rem"
                fontWeight="500"
                maxHeight="2.25rem"
              >
                Save
              </Button>
              <IconButton
                ml="1rem"
                icon={<Img src="/svg/close4.svg" />}
                bg="bgGray"
                border="none"
                isRound
                onClick={() => setShowAddModal(false)}
                size="sm"
              />
            </Flex>
          </Flex>
          <Img src="/png/addMyDeck.png" />
          <Flex
            my="1rem"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <Flex alignItems="center">
              <Text
                textTransform="uppercase"
                fontSize="0.75rem"
                color="gray"
                mr="0.5rem"
              >
                Source
              </Text>
              <Text fontSize="0.85rem">Local</Text>
            </Flex>

            <Flex position="absolute" left="50%" transform="translateX(-50%)">
              <Flex align="center" mr="1.5rem">
                <Box
                  bg="#811B1A"
                  width="14px"
                  mr="0.5rem"
                  height="14px"
                  borderRadius="50%"
                />
                Corona Extra
              </Flex>
              <Flex align="center">
                <Box
                  bg="#2A9872"
                  width="12px"
                  mr="0.5rem"
                  height="12px"
                  borderRadius="50%"
                />
                Stella Artois
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Page>
      <Box
        bg="formBgGray"
        height="15rem"
        position="relative"
        width="89%"
        margin="auto"
        pt="2rem"
        borderBottomRadius="8px"
      >
        <Box
          position="absolute"
          bg="primaryRed"
          width="6rem"
          py="0.2rem"
          left="0%"
          right="0%"
          margin="auto"
          zIndex="100"
          borderRadius="4px"
          textAlign="center"
          top="1.2rem"
        >
          <Text
            color="white"
            textTransform="uppercase"
            fontSize="0.85rem"
            fontWeight="600"
            letterSpacing="0.03rem"
          >
            notes
          </Text>
        </Box>
        <Box textAlign="center" width="100%">
          <TextArea
            width="82%"
            margin="auto"
            height="11rem"
            p="1rem"
            color="gray"
            {...register("notes")}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AddToMyDeckModal;
