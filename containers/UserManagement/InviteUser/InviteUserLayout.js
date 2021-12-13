import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import Navbar from "components/UserManagement/Navbar";
import axios, { responseHandler, errorHandler } from "@/lib/http";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";

const InviteLayout = () => {
  const [selectedBU, setSelectedBU] = useState([]);
  const [selectedKPI, setSelectedKPI] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [role, setRole] = useState({});
  const [accessData, setAccessData] = useState([]);
  const [masterData, setMasterData] = useState({ zones: [], countries: [] });

  useEffect(() => {
    axios({
      method: "get",
      url: "/country_brand",
    })
      .then(responseHandler)
      .then((res) => {
        const zones = [{ zone_name: "All", countries: res.countries }];
        let countries = [];
        zones.map((zone) => {
          countries = [...countries, ...zone.countries];
        });
        const sortedCountries = countries.sort((a, b) =>
          a.country.toLowerCase() > b.country.toLowerCase() ? 1 : -1
        );
        setMasterData({ zones, countries: sortedCountries });
      })
      .catch(errorHandler);
  }, []);

  return (
    <Box width="100%">
      <Navbar title="Invite User" />
      <Box width="838px" m="0 auto" mt="2rem" pb="4rem">
        <Section1
          accessData={accessData}
          role={role}
          kpi={selectedKPI}
          modules={selectedModules}
          masterData={masterData}
        />
        <Section2
          setRole={setRole}
          selectedModules={selectedModules}
          setSelectedModules={setSelectedModules}
        />
        <Section3 selectedKPI={selectedKPI} setSelectedKPI={setSelectedKPI} />
        <Section4
          masterData={masterData}
          selectedBU={selectedBU}
          setSelectedBU={setSelectedBU}
        />
        <Section5
          accessData={accessData}
          setAccessData={setAccessData}
          selectedBU={selectedBU}
        />
      </Box>
    </Box>
  );
};

export default InviteLayout;
