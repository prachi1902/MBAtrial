import React from "react";
import { Box } from "@chakra-ui/react";
import { Page } from "@/components/library";

export const Modal = ({ children, ...props }) => {
  return (
    <Box
      display="block"
      width="100vw"
      height="100vh"
      top="0"
      left="0"
      zIndex="9"
      pt="5rem"
      position="fixed"
      sx={{
        "&:before": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: "rgba(0,0,0,0.3)",
          zIndex: 0,
          backdropFilter: "blur(5px)",
        },
      }}
    >
      <Page
        py="0.5rem"
        px="0.5rem"
        width="43%"
        mt="-0.8rem"
        mb="-1.5rem"
        {...props}
      >
        {children}
      </Page>
    </Box>
  );
};
