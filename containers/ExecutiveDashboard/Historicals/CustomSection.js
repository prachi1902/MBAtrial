import React, { useState } from "react";
import { Flex, Text, Img, IconButton } from "@chakra-ui/react";

import { EditorDropdown } from "@/components/FormComponents";
import { useForm } from "react-hook-form";
import CustomTable from "../../../components/ExecutiveDashboard/Historicals/CustomTable";

const CustomSection = () => {
  const [tableView, setTableView] = useState(false);

  const { control } = useForm({
    defaultValues: {
      trend1: { label: "Volume", value: "volume" },
      trend2: { label: "Spend", value: "spend" },
    },
  });

  return (
    <>
      <Flex
        mb={tableView ? "1rem" : "1.5rem"}
        mt="0.5rem"
        align="center"
        justify="space-between"
        position="relative"
        p="0.8rem 1.5rem"
        bg="#efefef"
      >
        {tableView ? (
          <Text>Define Custom Trend</Text>
        ) : (
          <Text>Custom Trend</Text>
        )}
        <Flex position="absolute" left="50%" transform="translateX(-50%)">
          <EditorDropdown
            name="trend1"
            control={control}
            label="trend1"
            options={[
              { label: "Volume", value: "volume" },
              { label: "Spend", value: "spend" },
              { label: "NR", value: "nr" },
              { label: "Maco", value: "maco" },
              { label: "ROI", value: "roi" },
            ]}
            boxProps={{
              display: "flex",
              alignItems: "center",
              mr: "1rem",
            }}
            labelProps={{
              variant: "bold",
              fontSize: "0.8rem",
              mb: "0rem",
              mr: "0.5rem",
              ml: "0rem",
            }}
            pl="0rem"
            pr="0rem"
            width="8.5rem"
          />
          <EditorDropdown
            name="trend2"
            control={control}
            label="trend2"
            options={[
              { label: "Volume", value: "volume" },
              { label: "Spend", value: "spend" },
              { label: "NR", value: "nr" },
              { label: "Maco", value: "maco" },
              { label: "ROI", value: "roi" },
            ]}
            boxProps={{
              display: "flex",
              alignItems: "center",
              mr: "1rem",
            }}
            labelProps={{
              variant: "bold",
              fontSize: "0.8rem",
              mb: "0rem",
              mr: "0.5rem",
              ml: "0rem",
            }}
            pl="0rem"
            pr="0rem"
            width="8.5rem"
          />
        </Flex>
        <Flex>
          {tableView ? (
            <IconButton
              variant="unstyled"
              icon={<Img src="/svg/chart.svg" />}
              onClick={() => setTableView(false)}
            />
          ) : (
            <IconButton
              variant="unstyled"
              icon={<Img src="/svg/data.svg" />}
              onClick={() => setTableView(true)}
            />
          )}
          <IconButton
            variant="unstyled"
            icon={<Img src="/svg/Pin.svg" />}
            minWidth="auto"
            mr="0.3rem"
          />
        </Flex>
      </Flex>
      {tableView ? (
        <CustomTable />
      ) : (
        <Img src="/png/7-graph.png" p="1rem" px="1.5rem" width="100%" />
      )}
    </>
  );
};

export default CustomSection;
