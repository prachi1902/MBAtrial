import React, { useState } from "react";
import { Flex, Text, Img, Button, Box, Grid } from "@chakra-ui/react";
import { saveAs } from "file-saver";

import axios, { responseHandler, errorHandler } from "lib/http";

const DownloadDataSet = () => {
  const templates = [
    { text: "Financials Template", key: "financial_temp" },
    { text: "Media Volume", key: "media_volume" },
    { text: "Maco per HL", key: "maco_per_hl" },
    { text: "NR per HL", key: "nr_per_hl" },
    { text: "Reach Cost", key: "reach_cost" },
    { text: "Response Curve", key: "response_curve" },
    { text: "Shipments", key: "shipments" },
    { text: "Spend Template", key: "spend_template" },
    { text: "Master Mapping", key: "master_mapping" },
    { text: "Sales Volume", key: "sales_volume" },
    { text: "Actual CPM", key: "actual_cpm" },
  ];
  const [selectedDatasets, setSelectedDatasets] = useState([]);
  const [loading, setLoading] = useState(false);

  const downloadSets = () => {
    setLoading(true);
    axios({
      url: "/data_mgmt/select_dataset",
      method: "post",
      data: { dataset: selectedDatasets },
    })
      .then(responseHandler)
      .then(() => {
        axios({ url: "/data_mgmt/download", responseType: "arraybuffer" })
          .then(responseHandler)
          .then((res) => {
            const blob = new Blob([res], {
              type: "application/octet-stream",
            });
            const filename = "data.zip";
            saveAs(blob, filename);
          })
          .catch(errorHandler)
          .finally(() => setLoading(false));
      })
      .catch(errorHandler)
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Box mb="1rem" px="1.5rem">
        <Grid templateColumns="repeat(4, 1fr)">
          {templates.map((button, i) => {
            return (
              <Button
                key={i}
                variant="vehicle"
                onClick={() => {
                  if (selectedDatasets.includes(button.key)) {
                    const i = selectedDatasets.indexOf(button.key);
                    let newData = [...selectedDatasets];
                    newData.splice(i, 1);
                    setSelectedDatasets(newData);
                  } else {
                    setSelectedDatasets((state) => [...state, button.key]);
                  }
                }}
                borderTopLeftRadius={i === 0 && "8px"}
                borderTopRightRadius={i === 3 && "8px"}
                borderBottomLeftRadius={i === 8 && "8px"}
                borderBottomRightRadius={i === 10 && "8px"}
                bg={selectedDatasets.includes(button.key) ? "#C7DFD7" : ""}
                borderColor={
                  selectedDatasets.includes(button.key) ? "#88B8A9" : "#ECEBEC"
                }
                borderWidth="1px"
                justifyContent="space-between"
                rightIcon={
                  selectedDatasets.includes(button.key) ? (
                    <Img src="/svg/selected_item_green.svg" />
                  ) : null
                }
              >
                {button.text}
              </Button>
            );
          })}
        </Grid>
      </Box>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        position="relative"
        px="1.5rem"
      >
        <Button
          variant="basic"
          onClick={() => {
            if (selectedDatasets.length === templates.length) {
              setSelectedDatasets([]);
            } else {
              setSelectedDatasets(templates.map((temp) => temp.key));
            }
          }}
          leftIcon={<Img src="/svg/small tick.svg" />}
        >
          {selectedDatasets.length === templates.length
            ? "Deselect"
            : "Select All"}
        </Button>
        <Box position="absolute" left="50%" transform="translateX(-50%)">
          <Button
            variant="primary"
            leftIcon={<Img src="/svg/Download.svg" />}
            fontWeight="600"
            onClick={downloadSets}
            isLoading={loading}
          >
            Download
          </Button>
        </Box>
        <Text fontSize="0.9rem" color="darkGray" fontStyle="italic">
          .zip file of templates / existing data will be downloaded
        </Text>
      </Flex>
    </>
  );
};

export default DownloadDataSet;
