import React, { useState, useEffect, useCallback } from "react";
import {
  Flex,
  Text,
  Img,
  Button,
  Box,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import Loader from "components/common/FullScreenLoader";
import { saveAs } from "file-saver";

import {
  StyledSelect,
  DropdownIndicator,
} from "@/components/FormComponents/SelectDropdown";
import axios, { responseHandler, errorHandler } from "@/lib/http";
import { useDataManagement } from "@/redux/DataManagementSlice";

const UploadDataSet = ({ errorFiles, successFiles }) => {
  const [hasUploaded, setHasUploaded] = useState(false);
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);
  const { dataMngDispatch } = useDataManagement();

  const onDrop = (acceptedFiles) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("files", acceptedFiles[0]);
    setFilename(acceptedFiles[0]?.name);
    axios
      .post("http://mt-mba-be-api:8000/v1/data_mgmt/upload_files", formData)
      .then(responseHandler)
      .then((res) => {
        setHasUploaded(true);
      })
      .catch(errorHandler)
      .finally(() => setLoading(false));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:
      ".csv, text/csv, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values, .xls, .xlsx",
  });

  return (
    <Box mx="3.5rem" bg="#ddd" height="392px" borderRadius="16px" my="0.5rem">
      {loading && <Loader />}
      {hasUploaded ? (
        <Flex width="100%" direction="column" height="100%" alignItems="center">
          <Box width="100%" p="1rem">
            <Flex mb="0.5rem" width="45%" justify="space-between">
              <Text width="50%" color="darkGray" fontSize="0.75rem">
                FILE
              </Text>
              <Text width="50%" color="darkGray" fontSize="0.75rem">
                DATASET
              </Text>
            </Flex>
            <FileRow
              filename={filename}
              successFiles={successFiles}
              errorFiles={errorFiles}
            />
          </Box>
          <Spacer />
          <Button
            mb="1rem"
            leftIcon={<Img src="/svg/back.svg" />}
            variant="gray"
            bg="#bbb"
            onClick={() => {
              setHasUploaded(false);
              setFilename("");
              dataMngDispatch.setTemplateTypeData({});
            }}
          >
            Reupload Files
          </Button>
        </Flex>
      ) : (
        <Box height="100%" {...getRootProps()}>
          <Flex
            height="100%"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            pt="1rem"
          >
            <input {...getInputProps()} />
            <Img src="/png/dnd.png" my="2rem" mt="4rem" />
            <Text fontSize="1.2rem" my="0.5rem">
              Drag and Drop Updated Files Here
            </Text>
            <Text
              textTransform="uppercase"
              color="darkGray"
              fontSize="0.7rem"
              mb="0.5rem"
            >
              Please ensure the files you are uploading follow the same naming
              convention as the downloaded templates
            </Text>
            <Text
              textTransform="uppercase"
              color="darkGray"
              fontSize="0.7rem"
              mb="1rem"
            >
              .xls or .csv files
            </Text>
            <Button
              leftIcon={<Img src="/svg/portfolio plan.svg" />}
              variant="gray"
              bg="#bbb"
            >
              Browse
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

const FileRow = ({ errorFiles, successFiles, filename }) => {
  const typeOptions = [
    {
      label: "Financials Template",
      value: "financial_temp",
    },
    { label: "Media Volume", value: "media_volume" },
    { label: "MACO per HL", value: "maco_per_hl" },
    { label: "NR per HL", value: "nr_per_hl" },
    { label: "Reach Cost", value: "reach_cost" },
    { label: "Response Curve", value: "response_curve" },
    { label: "Shipments", value: "shipments" },
    { label: "Spend Template", value: "spend_template" },
    { label: "Master Mapping", value: "master_mapping" },
    { label: "Sales Volume", value: "sales_volume" },
    { label: "Actual CPM", value: "actual_cpm" },
  ];
  const [templateType, setTemplateType] = useState("");
  const [status, setStatus] = useState(null);
  const { dataMngDispatch, dataMngState } = useDataManagement();

  useEffect(() => {
    if (successFiles && templateType) {
      let type = "";
      successFiles.forEach((file) => {
        type = file.split(".")[0];
      });
      if (templateType?.value === type) {
        setStatus("success");
      }
    }
    if (errorFiles && templateType) {
      let type = "";
      errorFiles.forEach((file) => {
        type = file.split(".")[0];
      });
      if (templateType?.value === type) {
        setStatus("error");
      }
    }
  }, [errorFiles, successFiles]);

  useEffect(() => {
    if (filename) {
      typeOptions.forEach((option) => {
        if (filename.includes(option.value)) {
          setTemplateType(option);
          dataMngDispatch.setTemplateTypeData({
            ...dataMngState.templateTypeData,
            [filename]: { filename, template_type: option.value },
          });
        }
      });
    }
  }, [filename]);

  return (
    <Flex width="100%" align="center" justify="space-between">
      <Flex width="50%" align="center">
        <Text width="32%" fontSize="0.875rem" mr="4rem">
          {filename}
        </Text>
        <Box width="50%">
          <StyledSelect
            classNamePrefix="Select"
            components={{ DropdownIndicator }}
            name="type"
            options={typeOptions}
            value={templateType}
            onChange={(e) => {
              dataMngDispatch.setTemplateTypeData({
                ...dataMngState.templateTypeData,
                [filename]: { filename, template_type: e.value },
              });
              setTemplateType(e);
            }}
          />
        </Box>
        {status === "error" && (
          <Img src="/svg/wrong.svg" ml="1rem" height="30px" />
        )}
        {status === "success" && (
          <Img src="/svg/correct.svg" ml="1rem" height="30px" />
        )}
      </Flex>
      <Flex>
        {status === "error" && (
          <IconButton
            onClick={() =>
              axios({
                url: "http://mt-mba-be-api:8000/v1/data_mgmt/download_error_files",
                method: "POST",
                data: { dataset: [templateType.value] },
                responseType: "arraybuffer",
              })
                .then(responseHandler)
                .then((res) => {
                  const blob = new Blob([res], {
                    type: ".xlsx",
                  });
                  const filename = "error.xlsx";
                  saveAs(blob, filename);
                })
                .catch(errorHandler)
            }
            icon={<Img src="/svg/Download.svg" />}
            isRound={true}
            border="none"
            bg="mediumGray"
          />
        )}
      </Flex>
    </Flex>
  );
};

export default UploadDataSet;
