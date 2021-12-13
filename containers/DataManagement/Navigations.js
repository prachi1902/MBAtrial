import React from "react";
import {
  Box,
  Flex,
  Text,
  Img,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Container, Section } from "components/library";
import { useUser } from "redux/UserSlice";

const Navigations = () => {
  const router = useRouter();
  const { userState, userDispatch } = useUser();

  return (
    <Section
      as="nav"
      width="100%"
      position="relative"
      zIndex="4"
      alignItems="center"
      backgroundColor="primaryRed"
      boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
    >
      <Container
        display="flex"
        height="4rem"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Flex alignItems="center">
          <IconButton
            variant="primaryIconButton"
            isRound={true}
            icon={<Img src="/svg/back.svg" />}
            onClick={() => router.back()}
          />
          <Text ml="2rem" color="white">
            Data Management
          </Text>
        </Flex>

        <Text color="primaryYellow">Planning Period: 2021</Text>

        <Flex h="100%" alignItems="center">
          <IconButton
            mr="27px"
            aria-label="explore"
            isRound={true}
            icon={<Img src="/svg/world2.svg" />}
          />
          <IconButton
            aria-label="notification"
            isRound={true}
            icon={<Img src="/svg/Notification.svg" />}
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
              zIndex="100"
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
                    <Text fontSize="0.9rem">{userState.name}</Text>
                    <Text
                      color="primaryRed"
                      textTransform="uppercase"
                      fontSize="0.75rem"
                      letterSpacing="0.01rem"
                    >
                      -
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
                  <Text fontSize="0.75rem">-</Text>
                </Flex>
              </Box>
              <Box p="0.8rem" pb="1.2rem">
                <MenuItem
                  icon={<Img src="/svg/share.svg" mr="-0.2rem" />}
                  fontSize="0.9rem"
                  pr="1rem"
                  py="0.5rem"
                >
                  Share Plan
                </MenuItem>
                <MenuItem
                  icon={<Img src="/svg/user management.svg" mr="-0.1rem" />}
                  fontSize="0.9rem"
                  pr="1rem"
                  py="0.5rem"
                >
                  User Management
                </MenuItem>
                <MenuItem
                  onClick={() => router.push("/data-management")}
                  icon={<Img src="/svg/data management.svg" mr="0.15rem" />}
                  fontSize="0.9rem"
                  pr="1rem"
                  py="0.5rem"
                >
                  Data Management
                </MenuItem>
                <MenuItem
                  icon={<Img src="/svg/Logout.svg" mr="0.15rem" />}
                  fontSize="0.9rem"
                  pr="1rem"
                  py="0.5rem"
                  onClick={() => {
                    userDispatch.logoutUser();
                    router.push("/");
                  }}
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
          width="22.5rem"
          right="0"
          zIndex="-1"
          bgImage="url(/png/gra_header.png)"
          bgSize="100% 100%"
        ></Box>
      </Container>
    </Section>
  );
};

export default Navigations;
