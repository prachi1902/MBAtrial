import React, { useState } from "react";
import { Flex, Text, Img, Button, Box, IconButton } from "@chakra-ui/react";

import { Page } from "@/components/library";
import DownloadDataSet from "./DownloadDataSet";
import UploadDataSet from "./UploadDataSet";
import axios, { responseHandler, errorHandler } from "@/lib/http";
import Loader from "components/common/FullScreenLoader";
import { useDataManagement } from "redux/DataManagementSlice";

const DatasetModal = () => {
  const [successFiles, setSuccessFiles] = useState([]);
  const [errorFiles, setErrorFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dataMngDispatch, dataMngState } = useDataManagement();

  const analyze = () => {
    setLoading(true);
    const templatedData = Object.keys(dataMngState.templateTypeData).map(
      (filename) => dataMngState.templateTypeData[filename]
    );
    axios({
      url: "http://mt-mba-be-api:8000/v1/data_mgmt/assign_template_type",
      method: "POST",
      data: { files: templatedData },
    })
      .then(responseHandler)
      .then(() => {
        axios
          .get("/data_mgmt/data_validation")
          .then(responseHandler)
          .then((res) => {
            setSuccessFiles(res.success_files);
            setErrorFiles(res.error_files);
            if (res.success_files.length) dataMngDispatch.setShouldUpdate(true);
            axios.get("/data_mgmt/upload_valid_files").catch(errorHandler);
          })
          .catch(errorHandler)
          .finally(() => setLoading(false));
      })
      .catch(errorHandler);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      top="0"
      left="0"
      zIndex="9"
      pt="4.5rem"
      position="fixed"
      bg="rgba(160,160,160,0.7)"
      css={{ backdropFilter: "blur(4px)" }}
    >
      {loading && <Loader />}
      <Page
        width="73%"
        pt="1rem"
        pb="0rem"
        boxShadow="0 2px 4px 0 rgba(0,0,0,0.2)"
      >
        <Flex
          justifyContent="space-between"
          mb="1rem"
          alignItems="center"
          px="1.5rem"
          position="relative"
        >
          <Text letterSpacing="0.02rem">Update Data Sets</Text>
          <Flex alignItems="center">
            <Button
              variant={
                dataMngState.modalOpen === "download" ? "primary" : "basic"
              }
              color={dataMngState.modalOpen !== "download" && "darkGray"}
              fontWeight="500"
              onClick={() => dataMngDispatch.setModal("download")}
              fontSize="0.875rem"
              maxHeight="2.25rem"
            >
              Download Existing Data Set
            </Button>
            <Button
              variant={
                dataMngState.modalOpen === "upload" ? "primary" : "basic"
              }
              color={dataMngState.modalOpen !== "upload" && "darkGray"}
              fontWeight="500"
              onClick={() => dataMngDispatch.setModal("upload")}
              fontSize="0.875rem"
              maxHeight="2.25rem"
            >
              Upload Edited Data Set
            </Button>
          </Flex>
          <Flex>
            {Object.keys(dataMngState.templateTypeData).length &&
            dataMngState.modalOpen === "upload" ? (
              <Button
                onClick={analyze}
                leftIcon={<Img src="/svg/maximize.svg" />}
                mr="1rem"
              >
                Analyse
              </Button>
            ) : null}
            <IconButton
              size="sm"
              icon={<Img src="/svg/close2.svg" />}
              isRound={true}
              border="none"
              onClick={() => dataMngDispatch.closeModal()}
              bg="bgGray"
            />
          </Flex>
        </Flex>
        <Box bg="#f4f4f4" py="1.5rem" pb="1rem">
          {dataMngState.modalOpen === "download" ? (
            <DownloadDataSet />
          ) : (
            <UploadDataSet
              successFiles={successFiles}
              errorFiles={errorFiles}
            />
          )}
        </Box>
      </Page>
    </Box>
  );
};

export default DatasetModal;
