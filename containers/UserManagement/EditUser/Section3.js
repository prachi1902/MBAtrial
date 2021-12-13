import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Img } from "@chakra-ui/react";

import { Checkbox } from "@/components/FormComponents";
import useAxios from "components/Hooks/useAxios";
import { useUser } from "@/redux/UserSlice";

const Section3 = ({ selectedKPI, setSelectedKPI, user }) => {
  const { userState } = useUser();
  const [kpisData, setKpisData] = useState([]);
  const getKpis = useAxios({
    url: "http://20.106.155.34:5005/v1/kpis?project_name=MBAT",
    manual: true,
  });

  useEffect(() => {
    if (userState.access_token) {
      getKpis.execute();
    }
  }, [userState.access_token]);

  useEffect(() => {
    if (getKpis.response) {
      setKpisData(getKpis.response.kpi);
    }
  }, [getKpis.response]);

  useEffect(() => {
    if (kpisData?.length && user.permissions) {
      setSelectedKPI(user.permissions.kpi);
    }
  }, [kpisData, user]);

  return (
    <Box
      width="100%"
      boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.2)"
      borderRadius="6px"
      maxHeight="10rem"
      bg="white"
      p="1rem"
      px="1.5rem"
      mb="1.5rem"
    >
      <Flex justifyContent="space-between" alignItems="center" mb="0.4rem">
        <Text>Financials & KPI Data Access</Text>
        <Button
          onClick={() => {
            kpisData.length === selectedKPI.length
              ? setSelectedKPI([])
              : setSelectedKPI(kpisData);
          }}
          variant="primary"
          leftIcon={
            kpisData.length === selectedKPI.length ? (
              <div />
            ) : (
              <Img src="/svg/save.svg" />
            )
          }
        >
          {kpisData.length === selectedKPI.length
            ? "Unselect All"
            : "Full Access"}
        </Button>
      </Flex>
      <Flex flexWrap="wrap" width="100%">
        {kpisData?.map((kpi, i) => (
          <Flex key={kpi} alignItems="center" width="20%" mr="1rem" mb="0.5rem">
            <Checkbox
              checked={selectedKPI.includes(kpi)}
              onChange={() => {
                const i = selectedKPI.indexOf(kpi);
                if (i === -1) {
                  setSelectedKPI([...selectedKPI, kpi]);
                } else {
                  const temp = [...selectedKPI];
                  temp.splice(i, 1);
                  setSelectedKPI(temp);
                }
              }}
              inviteUser={true}
            />
            <Text ml="0.5rem">{kpi}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default Section3;
