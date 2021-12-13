import React from "react";
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

import { useMediaPlan } from "@/redux/MediaPlanSlice";

const ScenarioCard = ({
  plan,
  tagBg,
  current = false,
  tag = false,
  finalized = false,
  newOptPlan,
  duplicateSim,
}) => {
  const { mediaPlanDispatch, mediaPlanState } = useMediaPlan();

  return (
    <Box
      bg={
        plan.type === "ideal"
          ? "cardRed"
          : plan.type === "opt"
          ? "linear-gradient(180deg, #FCD5A5 0%, #F9AA4A 100%)"
          : "#ffffff"
      }
      borderRadius="8px"
      width="14.25rem"
      px="1rem"
      onClick={() => {
        console.log(plan);
        mediaPlanDispatch.selectPlan(plan);
        if (plan.hasExecuted) {
          mediaPlanDispatch.updateTab("Media Plan");
        } else {
          if (plan.type !== "sim") {
            mediaPlanDispatch.updateTab("Set Up");
          }
        }
        if (plan.type === "sim" && mediaPlanState.selectedTab === "Set Up") {
          mediaPlanDispatch.updateTab("Media Plan");
        }
      }}
      py="0.5rem"
      height="3.75rem"
      mr="0.5rem"
      position="relative"
      cursor={current ? "unset" : "pointer"}
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
        />
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
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontSize="0.9rem">{plan.title}</Text>
          {plan.type === "opt" && plan.objective && (
            <Text color="#8A5B23" fontSize="0.75rem" letterSpacing="0.05rem">
              {plan.objective}
            </Text>
          )}
          {plan.type === "sim" && plan.opt_plan_name && (
            <Text color="darkGray" fontSize="0.75rem" letterSpacing="0.05rem">
              {plan.from === "opt" && "From "}
              {plan.opt_plan_name}
            </Text>
          )}
        </Box>
        {plan.hasExecuted &&
          plan.type !== "ideal" &&
          !mediaPlanState.selectedPlan?.integrateMMM && (
            <Menu autoSelect={false}>
              <MenuButton
                as={IconButton}
                icon={<Img src="/svg/scenario options.svg" />}
                height="1.75rem"
                minWidth="1rem"
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
                  onClick={() => {
                    if (plan.type === "opt") {
                      newOptPlan();
                    } else {
                      duplicateSim();
                    }
                  }}
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
