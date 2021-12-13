import React, { useState } from "react";
import { Container, Section, Page } from "../library";
import { Flex, Text, Img, Box, Button, IconButton } from "@chakra-ui/react";
import WidgetCard from "./WidgetCard";
import { useMediaPlan } from "@/redux/MediaPlanSlice";

const RightWidget = () => {
  const { mediaPlanState } = useMediaPlan();
  return (
    <Page
      px="1.5rem"
      boxShadow="none"
      // border="0.08px solid lightGray"
      height="22rem"
      width="30%"
      mx="1.5rem"
    >
      <WidgetCard
        title="Brand stage"
        heading1="life stage"
        heading2="category"
        content1={mediaPlanState.newPlanDetails?.life_stage || "-"}
        content2={mediaPlanState.newPlanDetails?.category || "-"}
      />

      <WidgetCard
        title="Media principles"
        heading1="min reach"
        heading2="max reach"
        heading3="reco woa"
        heading4="frequency"
        content1={
          mediaPlanState.newPlanDetails?.min_reach
            ? `${mediaPlanState.newPlanDetails?.min_reach}%`
            : "-"
        }
        content2={
          mediaPlanState.newPlanDetails?.max_reach
            ? `${mediaPlanState.newPlanDetails?.max_reach}%`
            : "-"
        }
        content3={mediaPlanState.newPlanDetails?.rec_woa || "-"}
        content4={mediaPlanState.newPlanDetails?.frequency || "-"}
        double={true}
      />
    </Page>
  );
};

export default RightWidget;
