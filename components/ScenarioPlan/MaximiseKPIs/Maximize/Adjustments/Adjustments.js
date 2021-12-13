import React, { useState } from "react";
import { Flex, Text, Img, Button, IconButton } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Section, Page } from "@/components/library";
import { Tabs } from "@/components/FormComponents";
import Table from "./AdjustmentsTable";

const Adjustments = () => {
  const { control } = useForm({ defaultValues: { type: "Monthly" } });
  const tabs = ["Media inflation", "Brand Volume Trend", "NR/HL", "MaCo/HL"];
  const [tab, setTab] = useState("Media inflation");

  return (
    <Section my="1rem">
      <Page py="1rem" px="1.5rem">
        <Flex align="flex-end" justifyContent="space-between">
          <Text>Adjustments</Text>
          <Tabs
            height="32px"
            fontSize="0.875rem"
            name="type"
            control={control}
            options={["Monthly", "Yearly"]}
          />
          <Flex>
            <IconButton
              variant="gray"
              bg="#dddddd"
              isRound={true}
              icon={<Img src="/svg/upload.svg" />}
            />
            <IconButton
              variant="gray"
              ml="1rem"
              bg="#dddddd"
              isRound={true}
              icon={<Img src="/svg/Download.svg" />}
            />
          </Flex>
        </Flex>
        <Flex my="1rem">
          {tabs.map((data, i) => (
            <Button
              key={i}
              variant={tab === data ? "primary" : "basic"}
              onClick={() => {
                if (tab === data) {
                  null;
                } else {
                  setTab(data);
                }
              }}
              size="sm"
              border={tab === data ? "solid 1px #B27831" : "none"}
              color={tab === data ? "buttonText" : "darkGray"}
              boxShadow="none"
              fontWeight="normal"
              borderRadius="4px"
            >
              {data}
            </Button>
          ))}
        </Flex>
        <Table>
          <Table.Columns />
          <Table.CategoryRow title="DIGITAL">
            <Table.Row title="Vehicle name">
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
            </Table.Row>
            <Table.Row title="Vehicle name">
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
            </Table.Row>
            <Table.Row title="Variable Name" />
            <Table.Row title="Variable Name" />
            <Table.Row title="Variable Name" />
            <Table.Row title="Variable Name" />
          </Table.CategoryRow>
          <Table.CategoryRow title="TRADITIONAL">
            <Table.Row title="Vehicle name">
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
            </Table.Row>
            <Table.Row title="Variable Name" />
            <Table.Row title="Variable Name" />
            <Table.Row title="Variable Name" />
            <Table.Row title="Variable Name" />
          </Table.CategoryRow>
          <Table.CategoryRow title="TRADITIONAL 2">
            <Table.Row title="Variable Name" />
            <Table.Row title="Vehicle name">
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
            </Table.Row>
            <Table.Row title="Variable Name" />
            <Table.Row title="Variable Name" />
            <Table.Row title="Variable Name" />
          </Table.CategoryRow>
          <Table.CategoryRow title="DIGITAL 2">
            <Table.Row title="Vehicle name">
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
            </Table.Row>
            <Table.Row title="Variable Name" />
            <Table.Row title="Vehicle name">
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
            </Table.Row>
            <Table.Row title="Variable Name" />
          </Table.CategoryRow>
          <Table.CategoryRow title="TRADITIONAL 3">
            <Table.Row title="Vehicle name">
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
            </Table.Row>
            <Table.Row title="Vehicle name">
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
            </Table.Row>
          </Table.CategoryRow>
          <Table.CategoryRow title="DIGITAL 3">
            <Table.Row title="Vehicle name">
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
            </Table.Row>
            <Table.Row title="Variable Name" />
            <Table.Row title="Variable Name" />
            <Table.Row title="Variable Name" />
            <Table.Row title="Variable Name" />
          </Table.CategoryRow>
          <Table.CategoryRow title="TRADITIONAL 4">
            <Table.Row title="Vehicle name">
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
            </Table.Row>
            <Table.Row title="Variable Name" />
            <Table.Row title="Variable Name" />
            <Table.Row title="Vehicle name">
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
              <Table.SubRow title="Sub-vehicle name" />
            </Table.Row>
            <Table.Row title="Variable Name" />
            <Table.Row title="Variable Name" />
          </Table.CategoryRow>
        </Table>
      </Page>
    </Section>
  );
};

export default Adjustments;
