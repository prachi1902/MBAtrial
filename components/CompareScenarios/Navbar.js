import React from "react";
import {
  Flex,
  Text,
  Menu,
  MenuButton,
  IconButton,
  Img,
  MenuList,
  MenuItem,
  Box,
  Button,
} from "@chakra-ui/react";
import { Container, Section } from "components/library";

const Navbar = ({ label = "Compare scenarios" }) => {
  return (
    <Section
      as="nav"
      width="100%"
      position="relative"
      zIndex="3"
      alignItems="center"
      backgroundColor="primaryRed"
      boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
    >
      <Container
        display="flex"
        height="4rem"
        justifyContent="space-between"
        alignItems="center"
        position="relative"
      >
        <Flex alignItems="center">
          <IconButton
            variant="primaryIconButton"
            isRound={true}
            icon={<Img src="/svg/back.svg" />}
          />
          <Text ml="1.5rem" color="white">
            {label}
          </Text>
        </Flex>

        <Flex
          alignItems="center"
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
        >
          <Img
            src={"/png/CoronaExtra.png"}
            mr="1rem"
            borderRadius="8px"
            width="5.25rem"
            height="3.8rem"
          />
          <Text
            textTransform="uppercase"
            mr="1rem"
            color="white"
            fontSize="0.9rem"
          >
            mex
          </Text>
          <Text
            textTransform="uppercase"
            mr="1rem"
            color="white"
            fontSize="0.9rem"
          >
            1yp
          </Text>
          <Text fontSize="0.9rem" color="white">
            2021
          </Text>
        </Flex>
        <Flex alignItems="center">
          <IconButton
            variant="primary"
            isRound={true}
            icon={<Img src="/svg/flag.svg" />}
          />
          <IconButton
            ml="1.5rem"
            isRound={true}
            icon={<Img src="/svg/Notification.svg" />}
            variant="primary"
          />
          <Menu autoSelect={false}>
            <MenuButton
              as={IconButton}
              ml="1.5rem"
              isRound={true}
              icon={<Img src="/svg/Menu.svg" />}
              variant="primary"
            />
            <MenuList
              zIndex="10"
              border="none"
              position="absolute"
              top="-1.5rem"
              right="-1.5rem"
              py="0rem"
              borderRadius="8px"
              boxShadow="0 2px 2px 0 rgba(0,0,0,0.2)"
            >
              <Box
                bg="linear-gradient(180deg, #FCD5A5 0%, #F9AA4A 100%)"
                p="1rem"
                pb="0.7rem"
                borderTopRadius="8px"
              >
                <Flex alignItems="center" mb="1.2rem">
                  <Img
                    src="/png/user.png"
                    isRound={true}
                    bg="white"
                    mr="0.6rem"
                  />
                  <Box>
                    <Text fontSize="0.9rem">John Smith</Text>
                    <Text
                      color="primaryRed"
                      textTransform="uppercase"
                      fontSize="0.75rem"
                      letterSpacing="0.01rem"
                    >
                      connections manager
                    </Text>
                  </Box>
                </Flex>
                <Flex alignItems="center" justifyContent="space-between">
                  <Text
                    color="primaryRed"
                    textTransform="uppercase"
                    fontSize="0.75rem"
                  >
                    last login
                  </Text>
                  <Text fontSize="0.75rem">5:30 PM, 04 / 02 / 2020</Text>
                </Flex>
              </Box>
              <Box p="0.8rem" pb="1.2rem">
                <MenuItem px="0.5rem" pr="1rem">
                  <Button
                    leftIcon={
                      <Img
                        src="/svg/final scenario badge.svg"
                        boxSize="1.5rem"
                      />
                    }
                    variant="primary"
                    fontWeight="500"
                    width="100%"
                    px="0rem"
                    maxHeight="2.25rem"
                    onClick={() => setShowFinalizeModal(true)}
                  >
                    <Text pl="0.2rem">Finalize Scenario</Text>
                  </Button>
                </MenuItem>
                <MenuItem
                  icon={<Img src="/svg/share.svg" mr="-0.2rem" />}
                  fontSize="0.9rem"
                  px="1.8rem"
                  pr="1rem"
                  py="0.5rem"
                >
                  Share Plan
                </MenuItem>
                <MenuItem
                  icon={<Img src="/svg/user management.svg" mr="-0.1rem" />}
                  fontSize="0.9rem"
                  px="1.8rem"
                  pr="1rem"
                  py="0.5rem"
                >
                  User Management
                </MenuItem>
                <MenuItem
                  icon={<Img src="/svg/data management.svg" mr="0.15rem" />}
                  fontSize="0.9rem"
                  px="1.8rem"
                  pr="1rem"
                  py="0.5rem"
                >
                  Data Management
                </MenuItem>
                <MenuItem
                  icon={<Img src="/svg/Logout.svg" mr="0.15rem" />}
                  fontSize="0.9rem"
                  px="1.8rem"
                  pr="1rem"
                  py="0.5rem"
                >
                  Logout
                </MenuItem>
              </Box>
            </MenuList>
          </Menu>
        </Flex>
        <Box
          position="absolute"
          height="100%"
          width="25rem"
          right="-75px"
          zIndex="-1"
          bgImage="url(/png/gra_header.png)"
          bgSize="100% 100%"
        ></Box>
      </Container>
    </Section>
  );
};

export default Navbar;
