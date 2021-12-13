import React, { useState } from "react";
import { Flex, Text, Img, IconButton } from "@chakra-ui/react";

import { Modal } from "@/components/common/Modal";
import { useMediaPlan } from "@/redux/MediaPlanSlice";

function NewMediaModal({ setView }) {
  const { mediaPlanState } = useMediaPlan();

  return (
    <Modal
      zIndex="1"
      bg="white"
      position="relative"
      boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
    >
      <Flex
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
          />
        </Flex>
        <Img mt="0.8rem" height="7rem" src={`/png/Processor.png`} />
        <Text
          fontSize="0.9rem"
          mt="1.8rem"
          mb="1.8rem"
          textAlign="center"
          width="42%"
          lineHeight="19px"
        >
          Click &quot;
          <b>
            {mediaPlanState.selectedPlan.type === "ideal"
              ? "Show Ideal Media Plan"
              : mediaPlanState.selectedPlan.type === "opt"
              ? "Optimize Plan"
              : "Simulate Plan"}
          </b>
          &quot; to view media plan / vehicle mix or driver analysis
        </Text>
      </Flex>
    </Modal>
  );
}

export default NewMediaModal;
