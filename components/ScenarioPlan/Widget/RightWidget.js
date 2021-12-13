import React from "react";
import { Page } from "../../library";
import WidgetCard from "./WidgetCard";

const RightWidget = () => {
  return (
    <Page px="1.5rem" boxShadow="none" height="22rem" width="30%" mx="1.5rem">
      <WidgetCard
        title="Brand stage"
        heading1="life stage"
        heading2="category"
        content1="Maintain"
        content2="Core"
      />

      <WidgetCard
        title="Media principles"
        heading1="min reach"
        heading2="max reach"
        heading3="reco woa"
        heading4="frequency"
        content1="40%"
        content2="50%"
        content3="26-42"
        content4="2"
        double={true}
      />
    </Page>
  );
};

export default RightWidget;
