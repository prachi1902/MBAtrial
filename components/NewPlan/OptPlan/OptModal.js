import React, { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { Flex, Text, Img, IconButton } from "@chakra-ui/react";
import "react-multi-carousel/lib/styles.css";

function OptModal({ setView }) {
  return (
    <Modal
      mt="-0.5rem"
      zIndex="1"
      bg="white"
      position="relative"
      boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
    >
      {/* <Box height="60%" width="100%" border="2px solid blue"> */}

      <Flex
        // border="1px solid black"
        width="100%"
        height="100%"
        alignItems="center"
        flexDirection="column"
      >
        <Flex
          alignItems="center"
          justifyContent="flex-end"
          width="100%"
          px="0.3rem"
          py="0.1rem"
        >
          <IconButton
            size="sm"
            icon={<Img height="12px" src="/svg/close small.svg" />}
            isRound={true}
            border="none"
            onClick={() => {
              setView(false);
            }}
            bg="bgGray"
            height="1.5rem"
            width="1.5rem"
            mt="0.45rem"
            mr="0.35rem"
          />
        </Flex>
        <Img mt="0.8rem" height="110px" src={`/png/Processor.png`} />
        <Text
          fontSize="0.9rem"
          mt="2rem"
          mb="2rem"
          textAlign="center"
          width="42%"
          lineHeight="20px"
        >
          Run &quot;<b>Optimize Plan</b>&quot; to show <p>{"    "} </p>
          media plan / vehicle mix or driver analysis
        </Text>
      </Flex>
    </Modal>
  );
}

export default OptModal;
