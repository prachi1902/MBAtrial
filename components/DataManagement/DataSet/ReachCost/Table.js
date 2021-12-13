import React, { useState, useMemo } from "react";
import { Box, Spinner, Center } from "@chakra-ui/react";

import { Section } from "components/library";
import DMColumnBuilder from "components/common/DMColumnBuilder";
import Row from "./Row";
import axios, { responseHandler, errorHandler } from "lib/http";

const ReachCostTable = () => {
  const columnItems = [
    ["country", "16%"],
    ["vehicle", "16%"],
    ["sub vehicle", "16%"],
    ["target group", "16%"],
    ["reach", "16%"],
    ["spend", "16%"],
    ["year", "8%"],
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    setLoading(true);
    axios({
      url: "/data_mgmt/dataset_detail",
      params: { dataset_name: "reach_cost" },
    })
      .then(responseHandler)
      .then((res) => setData(res))
      .catch(errorHandler)
      .finally(() => setLoading(false));
  }, []);

  const rows = useMemo(() => {
    if (data.length) {
      const list = data.map((item) => <Row key={item.id} {...item} />);
      return list;
    }
  }, [data]);

  return (
    <Section px="0" mt="2rem" pb="2rem">
      <Box
        position="relative"
        overflowY="auto"
        height="660px"
        id="table-with-scrollbar"
      >
        <DMColumnBuilder columnItems={columnItems} />
        {loading ? (
          <Center width="100%" height="40vh">
            <Spinner color="primaryRed" size="xl" />
          </Center>
        ) : (
          rows
        )}
      </Box>
    </Section>
  );
};

export default ReachCostTable;
