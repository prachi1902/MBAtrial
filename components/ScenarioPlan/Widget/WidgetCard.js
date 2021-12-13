import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

const WidgetCard = ({
  title,
  heading1,
  heading2,
  content1,
  content2,
  heading3,
  heading4,
  content3,
  content4,
  double,
}) => {
  return (
    <Box
      width="100%"
      position="relative"
      border="1.8px solid lightGray"
      borderRadius="8px"
      mb="2rem"
    >
      <Box
        position="absolute"
        width="124px"
        left="calc(50% - 62px)"
        margin="auto"
        top={double ? "-7.5%" : "-12%"}
        color="primaryRed"
        bg="white"
        px="0.7rem"
        fontSize="0.87rem"
        textAlign="center"
      >
        {title}
      </Box>
      <Box>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          p="1.5rem"
          pb={double ? "0.5rem" : "1.5rem"}
          width="100%"
        >
          <Box textAlign="center">
            <Text
              color="gray"
              fontSize="0.7rem"
              letterSpacing="0.05rem"
              mb="0.5rem"
              textTransform="uppercase"
            >
              {heading1}
            </Text>
            <Text fontSize="0.95rem">{content1}</Text>
          </Box>
          <Box textAlign="center">
            <Text
              color="gray"
              fontSize="0.7rem"
              letterSpacing="0.05rem"
              mb="0.5rem"
              textTransform="uppercase"
            >
              {heading2}
            </Text>
            <Text fontSize="0.95rem">{content2}</Text>
          </Box>
        </Flex>
        {double && (
          <Flex
            justifyContent="space-between"
            alignItems="center"
            p="1.5rem"
            pt="0.3rem"
            width="100%"
          >
            <Box textAlign="center">
              <Text
                color="gray"
                fontSize="0.7rem"
                letterSpacing="0.05rem"
                mb="0.5rem"
                textTransform="uppercase"
              >
                {heading3}
              </Text>
              <Text fontSize="0.95rem">{content3}</Text>
            </Box>
            <Box textAlign="center">
              <Text
                color="gray"
                fontSize="0.7rem"
                letterSpacing="0.05rem"
                mb="0.5rem"
                textTransform="uppercase"
              >
                {heading4}
              </Text>
              <Text fontSize="0.95rem">{content4}</Text>
            </Box>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default WidgetCard;
