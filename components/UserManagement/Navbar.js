import React from "react";
import {
  Box,
  Flex,
  Text,
  Img,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import BetaTagWrapper from "components/common/BetaTagWrapper";
import { Container, Section } from "components/library";
import { InputBudget } from "@/components/FormComponents";
import { useUser } from "redux/UserSlice";

const Navbar = ({ showInvite = false, title }) => {
  const router = useRouter();
  const { userState, userDispatch } = useUser();

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
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Flex alignItems="center">
          <IconButton
            variant="primaryIconButton"
            isRound={true}
            onClick={() => {
              router.back();
            }}
            icon={<Img src="/svg/back.svg" />}
          />
          <Text ml="2rem" color="white">
            {title}
          </Text>
        </Flex>

        {/* {!invite && (
          <Box ml="6rem" width="300px">
            <InputBudget
              frontSymbol={<Img src="/svg/Search.svg" />}
              placeholder="Search by name / email to invite"
              width="100%"
              height="36px"
              flexProps={{
                borderRadius: "25px",
                boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)",
                width: "100%",
                border: "none",
              }}
              flexInsideProps={{ width: "100%" }}
              //   variant="search"
              inputProps={{
                width: "90%",
                textAlign: "center",
                fontSize: "0.92rem",
                lineHeight: "0",
                ml: "0rem",
              }}
            />
          </Box>
        )} */}
        <Flex h="100%" alignItems="center">
          {showInvite && (
            <Link href="/users/invite">
              <a>
                <Button
                  mr="27px"
                  leftIcon={<Img src="/svg/invite.svg" />}
                  onClick={() => router.push("/users/invite")}
                >
                  <Text textDecoration="none">Invite</Text>
                </Button>
              </a>
            </Link>
          )}
          <IconButton
            aria-label="explore"
            isRound={true}
            icon={<Img src="/svg/world2.svg" />}
          />
          <IconButton
            ml="1.6875rem"
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
                  <Avatar name={userState.name} bg="primaryRed" mr="0.6rem" />
                  <Box>
                    <Text fontSize="0.9rem">
                      {fullNameToUppercase(userState.name)}
                    </Text>
                    <Text
                      color="primaryRed"
                      textTransform="uppercase"
                      fontSize="0.75rem"
                      letterSpacing="0.01rem"
                    ></Text>
                  </Box>
                </Flex>
                {/* <Flex alignItems="center" justifyContent="space-between">
                  <Text
                    color="primaryRed"
                    textTransform="uppercase"
                    fontSize="0.75rem"
                  >
                    last login
                  </Text>
                  <Text fontSize="0.75rem">-</Text>
                </Flex> */}
              </Box>
              <Box p="0.8rem" pb="1.2rem">
                <BetaTagWrapper type="coming">
                  <MenuItem
                    icon={<Img src="/svg/share.svg" mr="-0.2rem" />}
                    fontSize="0.9rem"
                    pr="1rem"
                    py="0.5rem"
                  >
                    Share Plan
                  </MenuItem>
                </BetaTagWrapper>
                <MenuItem
                  onClick={() => router.push("/users")}
                  icon={<Img src="/svg/user management.svg" mr="-0.1rem" />}
                  fontSize="0.9rem"
                  pr="1rem"
                  py="0.5rem"
                >
                  User Management
                </MenuItem>
                {/* <MenuItem
                  onClick={() => router.push("/data-management")}
                  icon={<Img src="/svg/data management.svg" mr="0.15rem" />}
                  fontSize="0.9rem"
                  pr="1rem"
                  py="0.5rem"
                >
                  Data Management
                </MenuItem> */}
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
          bgImage="url('/png/gra_header image1.png')"
          bgSize="100% 100%"
        ></Box>
      </Container>
    </Section>
  );
};

export default Navbar;

const fullNameToUppercase = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
