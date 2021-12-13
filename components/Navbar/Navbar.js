import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
  MenuItem,
  Avatar,
} from "@chakra-ui/react";

import { Section } from "../library";
import MediaModal from "@/components/Navbar/MediaModal";
import { useMediaPlan } from "@/redux/MediaPlanSlice";
import { useUser } from "redux/UserSlice";
import BetaTagWrapper from "../common/BetaTagWrapper";

function Navbar() {
  const { mediaPlanDispatch } = useMediaPlan();
  const { userState, userDispatch } = useUser();
  const navItems = [
    { text: "Executive Dashboard", link: "/executive-dashboard" },
    { text: "Media Planner", link: "/media-planner" },
  ];
  const [selectedNav, setSelectedNav] = useState("Media Planner");
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (router.pathname === "/media-planner") {
      setSelectedNav("Media Planner");
    } else {
      setSelectedNav("Executive Dashboard");
    }
  }, [router.pathname]);

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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ xs: "column", sm: "row" }}
        width="100%"
        height="4rem"
      >
        <Flex alignItems="center" justifyContent="center" ml="1rem">
          <Flex as="a" onClick={() => router.push("/")}>
            <Img
              ml="-0.8rem"
              mt="0.2rem"
              mr="0.7rem"
              src="/svg/ABI logo white.svg"
              height="20px"
            />
            <Img
              ml="-0.1rem"
              src="/svg/MBA logo yellow topbar.svg"
              height="28px"
            />
          </Flex>
          <Flex px="1.5rem">
            {navItems.map((item, i) => (
              <Text
                key={i}
                as="a"
                color={
                  selectedNav === item.text ? "primaryYellow" : "primaryGray"
                }
                fontSize="0.9rem"
                mr="1rem"
                ml="0.6rem"
                onClick={() => router.push(item.link)}
              >
                {item.text}
              </Text>
            ))}
          </Flex>
        </Flex>

        <Img
          position="absolute"
          right="0px"
          height="62px"
          width="400px"
          src="/png/gra_header.png"
        />

        <Flex alignItems="center">
          <Menu autoSelect={false}>
            <MenuButton
              as={Button}
              leftIcon={<Img src="/svg/add.svg" mr="0.45rem" />}
              rightIcon={<Img src="/svg/new plan drop down.svg" />}
              variant="primary"
              mr="1.5rem"
              maxHeight="2.3rem"
              width="145px"
              position="relative"
            >
              New Plan
            </MenuButton>
            <MenuList
              pl="1rem"
              minWidth="11.25rem"
              py="0.75rem"
              position="absolute"
              top="-10px"
            >
              <MenuItem
                as={Button}
                leftIcon={<Img src="/svg/brand plan.svg" />}
                onClick={() => {
                  setIsOpen(!isOpen);
                  mediaPlanDispatch.resetPlan();
                }}
                width="9.125rem"
                mb="0.5rem"
                justifyContent="flex-start"
                _hover={{
                  bg: "linear-gradient(180deg, #FCD5A5 0%, #F9AA4A 100%)",
                  opacity: "0.8",
                }}
              >
                Brand plan
              </MenuItem>
              <MenuItem
                as={Button}
                leftIcon={<Img src="/svg/portfolio plan.svg" />}
                isDisabled
                width="9.125rem"
              >
                Portfolio plan
              </MenuItem>
            </MenuList>
          </Menu>
          <IconButton
            variant="primary"
            isRound={true}
            icon={<Img src="/svg/world2.svg" />}
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
        <MediaModal isOpen={isOpen} setIsOpen={setIsOpen} />
        <Box
          position="absolute"
          height="100%"
          width="22.5rem"
          right="0"
          zIndex="-1"
          bgImage="url(/png/gra_header.png)"
          bgSize="100% 100%"
        ></Box>
      </Box>
    </Section>
  );
}

export default Navbar;

const fullNameToUppercase = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
