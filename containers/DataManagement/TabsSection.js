import React from "react";
import { Flex, Text, Img, Box, Button } from "@chakra-ui/react";

import { Container } from "components/library";
import DataSetModal from "components/DataManagement/DataSetModal";
import { useDataManagement } from "redux/DataManagementSlice";

const TabsSection = ({ tabs }) => {
  const { dataMngDispatch, dataMngState } = useDataManagement();

  return (
    <Box width="100%" bg="bgGray" px="5rem" py="0.5rem" boxShadow="md">
      <Container>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            {tabs.map((item, i) =>
              dataMngState.tab === item ? (
                <Button key={i} mr="1rem" variant="whiteTab">
                  {item}
                </Button>
              ) : (
                <Text
                  key={i}
                  as="a"
                  color="darkGray"
                  fontSize="0.875rem"
                  mr="2rem"
                  onClick={() => dataMngDispatch.setTab(item)}
                >
                  {item}
                </Text>
              )
            )}
          </Flex>
          <Flex alignItems="center">
            <Button
              leftIcon={<Img src="/svg/Download.svg" />}
              variant="gray"
              fontWeight="500"
              mr="1rem"
              onClick={() => dataMngDispatch.setModal("download")}
            >
              Download
            </Button>
            <Button
              leftIcon={<Img src="/svg/upload.svg" />}
              variant="primary"
              fontWeight="500"
              onClick={() => {
                dataMngDispatch.setModal("upload");
              }}
            >
              Upload
            </Button>
          </Flex>
        </Flex>
        {dataMngState.modalOpen !== "none" && <DataSetModal />}
      </Container>
    </Box>
  );
};

export default TabsSection;
