import React from "react";
import { Box, Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";

const Container = (props) => {
  return (
    <Box maxWidth="1440px" m="0 auto" {...props}>
      {props.children}
    </Box>
  );
};

const Section = (props) => {
  return (
    <Box as="section" bg="pageBg" px="5rem" {...props}>
      {props.children}
    </Box>
  );
};
const Page = ({ children, ...props }) => {
  return (
    <Box
      maxWidth="1440px"
      borderRadius="8px"
      mx="auto"
      py="2rem"
      bg="white"
      boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
      {...props}
    >
      {children}
    </Box>
  );
};

const ModalWrapper = ({ children, isOpen }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay
        bg="rgba(50,50,50,0.4)"
        css={{ backdropFilter: "blur(6px)" }}
      />
      <ModalContent
        alignItems="center"
        maxW="none"
        bg="transparent"
        boxShadow="none"
      >
        {children}
      </ModalContent>
    </Modal>
  );
};

export { Page, Section, Container, ModalWrapper };
