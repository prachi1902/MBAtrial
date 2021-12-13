import React from "react";
import { Tooltip, Flex, Text, Img, IconButton } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { saveAs } from "file-saver";

import { Section, Page } from "components/library";
import { Tabs } from "components/FormComponents";
import PlanYearTable from "components/NewPlan/OptPlan/MediaPlan/PlanYearTable";
import PlanWeekTable from "@/components/NewPlan/OptPlan/MediaPlan/PlanWeekTable";
import { useMediaPlan } from "@/redux/MediaPlanSlice";
import axios, { responseHandler, errorHandler } from "lib/http";

const PlanKPIsSection = () => {
  const { control, watch } = useForm({
    defaultValues: {
      period: "FY Summary",
    },
  });

  const periodValue = watch("period");
  const { mediaPlanState } = useMediaPlan();
  const [loading, setLoading] = React.useState(false);

  const downloadPlan = () => {
    setLoading(true);
    axios({
      url: "/algo/response",
      responseType: "arraybuffer",
      params: { id: mediaPlanState.selectedPlan.id },
      method: "POST",
    })
      .then(responseHandler)
      .then((res) => {
        const blob = new Blob([res], {
          type: "application/octet-stream",
        });
        const filename = "52-week-plan.xlsx";
        saveAs(blob, filename);
      })
      .catch(errorHandler)
      .finally(() => setLoading(false));
  };

  return (
    <Section my="1rem">
      <Page py="1rem" px="1.5rem">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          position="relative"
          pb="1.5rem"
        >
          <Text>Plan KPIs</Text>
          <Tabs
            height="32px"
            fontSize="0.875rem"
            name="period"
            control={control}
            options={["FY Summary", "52 Week Plan"]}
          />
          <Flex>
            <Tooltip label="Download Results">
              <IconButton
                onClick={downloadPlan}
                variant="gray"
                ml="1rem"
                isLoading={loading}
                bg="#dddddd"
                isRound={true}
                icon={<Img src="/svg/Download.svg" />}
              />
            </Tooltip>
          </Flex>
        </Flex>
        {periodValue === "52 Week Plan" ? <PlanWeekTable /> : <PlanYearTable />}
      </Page>
    </Section>
  );
};

export default PlanKPIsSection;
