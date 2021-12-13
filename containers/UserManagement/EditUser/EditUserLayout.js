import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import Navbar from "components/UserManagement/Navbar";
import axios, { responseHandler, errorHandler } from "@/lib/http";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import FullScreenLoader from "@/components/common/FullScreenLoader";

const EditUserLayout = ({ id }) => {
  const [selectedBU, setSelectedBU] = useState([]);
  const [selectedKPI, setSelectedKPI] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [role, setRole] = useState({});
  const [accessData, setAccessData] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [masterData, setMasterData] = useState({ zones: [], countries: [] });

  useEffect(() => {
    setLoading(true);
    axios({ url: "http://20.106.155.34:5005/v1/user/list" })
      .then(responseHandler)
      .then((data) => {
        setUser(data.users.filter((user) => user.id === id)[0]);
      })
      .catch(errorHandler)
      .finally(() => setLoading(false));
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
      {loading && <FullScreenLoader />}
      <Navbar title="Edit User" />
      <Box width="838px" m="0 auto" mt="2rem" pb="4rem">
        <Section1
          user={user}
          accessData={accessData}
          role={role}
          kpi={selectedKPI}
          modules={selectedModules}
          masterData={masterData}
        />
        <Section2
          user={user}
          setRole={setRole}
          selectedModules={selectedModules}
          setSelectedModules={setSelectedModules}
        />
        <Section3
          user={user}
          selectedKPI={selectedKPI}
          setSelectedKPI={setSelectedKPI}
        />
        <Section4
          user={user}
          selectedBU={selectedBU}
          setSelectedBU={setSelectedBU}
          masterData={masterData}
        />
        <Section5
          user={user}
          accessData={accessData}
          setAccessData={setAccessData}
          selectedBU={selectedBU}
        />
      </Box>
    </Box>
  );
};

export default EditUserLayout;
