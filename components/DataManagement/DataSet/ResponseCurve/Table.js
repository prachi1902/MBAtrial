import React, { useState, useMemo } from "react";
import { Box } from "@chakra-ui/react";

import { Section } from "components/library";
import DMColumnBuilder from "components/common/DMColumnBuilder";
import Row from "./Row";
import axios, { responseHandler, errorHandler } from "lib/http";

const ResponseCurveTable = () => {
  const columnItems = [
    ["brand", "22%"],
    ["country", "22%"],
    ["NR per hl", "22%"],
    ["year", "22%"],
  ];
  const [data, setData] = useState([]);

  useMemo(() => {
    axios({
      url: "/data_mgmt/dataset_detail",
      params: { dataset_name: "response_curve" },
    })
      .then(responseHandler)
      .then((res) => setData(res))
      .catch(errorHandler);
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
        {rows}
      </Box>
    </Section>
  );
};

export default ResponseCurveTable;
