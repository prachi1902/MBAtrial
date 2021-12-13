import React, { useState } from "react";
import {
  Flex,
  Text,
  Box,
  Menu,
  MenuButton,
  IconButton,
  Img,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

const ScenarioCard = ({
  title,
  bg,
  tagBg,
  menu = true,
  current = false,
  tag = true,
  subhead = true,
  subheading,
  subheadColor,
  imgSrc = "/svg/scenario options.svg",
  setStateFinalized,
}) => {
  const [finalized, setFinalized] = useState(false);

  return (
    <Box
      height="60px"
      bg={bg}
      borderRadius="8px"
      width="14.25rem"
      px="1rem"
      py="1.2rem"
      mr="0.5rem"
      position="relative"
      sx={
        !current && {
          "&:before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: "rgba(0,0,0,0.3)",
            zIndex: 0,
          },
        }
      }
    >
      {tag && (
        <Box
          bg={tagBg}
          position="absolute"
          borderRadius="4px"
          height="1.4rem"
          width="1.4rem"
          top="-12px"
          left="6.45rem"
          boxShadow="lg"
          zIndex="9"
          cursor="pointer"
          onClick={() => {
            setFinalized(true);
            setStateFinalized(true);
          }}
        >
          {finalized && (
            <Img
              src="/svg/final scenario badge.svg"
              position="absolute"
              left="0"
              right="0"
              top="0"
              bottom="0"
              margin="auto"
            />
          )}
        </Box>
      )}
      {finalized && current && (
        <Box
          bg="#379972"
          position="absolute"
          borderRadius="4px"
          height="1.4rem"
          width="2.8rem"
          top="-12px"
          left="8px"
          boxShadow="lg"
          zIndex="9"
          color="white"
          textAlign="center"
          fontSize="0.9rem"
        >
          Final
        </Box>
      )}
      <Flex justifyContent="space-between" alignItems="center" mt="-0.5rem">
        <Box>
          <Text fontSize="0.9rem">{title}</Text>
          {subhead && (
            <Text
              color={subheadColor ? subheadColor : "darkGray"}
              fontSize="0.75rem"
              letterSpacing="0.05rem"
              mb="0.8rem"
            >
              {subheading}
            </Text>
          )}
        </Box>
        {menu && (
          <Menu autoSelect={false}>
            <MenuButton
              as={IconButton}
              icon={<Img src={imgSrc} />}
              height="1.75rem"
              minWidth="1.7rem"
              bg="transparent"
              boxShadow="none"
              border="none"
            />
            <MenuList
              variant="ellipsis"
              zIndex="1000"
              position="absolute"
              bottom="35px"
              left="30px"
              backdropFilter="blur(60px)"
              bg="#DAD0CF"
              border="none"
            >
              <MenuItem
                icon={<Img src="/png/ellipsis1.png" />}
                _hover={{ background: "transparent" }}
                _selected={{ background: "transparent" }}
              >
                Duplicate Scenario
              </MenuItem>
              <MenuItem
                icon={<Img src="/svg/delete2.svg" mr="0.18rem" />}
                _hover={{ background: "transparent" }}
                _selected={{ background: "transparent" }}
                ml="0.3rem"
              >
                Delete Scenario
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Box>
  );
};

export default ScenarioCard;
