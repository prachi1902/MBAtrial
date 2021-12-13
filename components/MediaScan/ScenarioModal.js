import React from "react";
import { Modal } from "@/components/common/Modal";
import { Flex, Text, Img, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import "react-multi-carousel/lib/styles.css";

function ScenarioModal({ setDeleteModal }) {
  return (
    <Modal>
      <Flex
        width="100%"
        height="100%"
        alignItems="center"
        flexDirection="column"
        bg="white"
        position="relative"
        zIndex="1"
        boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
        borderRadius="10px"
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          width="100%"
          px="0.3rem"
          mt="1rem"
        >
          <Text fontSize="0.9rem">
            Delete Scenario &quot;<b>User Defined 1</b>&quot;
          </Text>
        </Flex>

        <Img
          mt="1.5rem"
          height="110px"
          src={`/png/discard_scenario_pop_up.png`}
        />
        <Text
          fontSize="0.9rem"
          mt="1.5rem"
          mb="1rem"
          textAlign="center"
          width="58%"
          lineHeight="18px"
        >
          All plan edits in this scenario, vehicle mix analysis and driver
          analysis will be discarded.
        </Text>

        <Flex
          alignItems="center"
          justifyContent="space-around"
          width="60%"
          height="50px"
          mt="0.1rem"
        >
          <Button
            position="block"
            variant="secondary"
            zIndex="9"
            size="sm"
            boxShadow="none"
            width="30%"
            onClick={() => setDeleteModal(false)}
            mt="-0.5rem"
            mr="-2.5rem"
          >
            <Flex alignItems="center" justifyContent="space-between">
              <CloseIcon width="8px" height="8px" mr="10px" />
              <Text fontSize="0.8rem">Cancel</Text>
            </Flex>
          </Button>
          <Button
            variant="primary"
            zIndex="9"
            size="sm"
            boxShadow="none"
            width="45%"
            onClick={() => setDeleteModal(false)}
            mt="-0.5rem"
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Img
                height="20px"
                width="15px"
                src={`/png/delete2.png`}
                mr="10px"
              />
              <Text fontSize="0.8rem">Delete Scenario</Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
}

export default ScenarioModal;
