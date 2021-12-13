import React, { useState } from "react";
import {
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Img,
} from "@chakra-ui/react";

import CheckBox from "@/components/FormComponents/CompareDropdownCheckbox";
import { Section } from "@/components/library";
import BrandKPIsTable from "@/components/NewPlan/SimPlan/MediaPlan/BrandKPIsTable";

function BrandKPIsSection() {
  const scenarios = ["Opt Plan", "Ideal", "LY"];
  const [selectedScenario, setSelectedScenario] = useState(scenarios);
  return (
    <Section bg="formBgGray" px="2rem">
      <Flex alignItems="center" justifyContent="space-between">
        <Text py="1rem">Brand Results</Text>
        <Flex alignItems="center" justifyContent="space-between">
          <CompareDropdown
            selectedScenario={selectedScenario}
            setSelectedScenario={setSelectedScenario}
            scenarios={scenarios}
          />
        </Flex>
      </Flex>
      <Flex>
        <BrandKPIsTable selectedScenario={selectedScenario} />
      </Flex>
    </Section>
  );
}

export default BrandKPIsSection;

const CompareDropdown = ({
  scenarios,
  selectedScenario,
  setSelectedScenario,
}) => {
  const select = (scenario) => {
    const i = selectedScenario.indexOf(scenario);
    if (i > -1) {
      const temp = [...selectedScenario];
      temp.splice(i, 1);
      setSelectedScenario(temp);
    } else {
      setSelectedScenario([...selectedScenario, scenario]);
    }
  };
  return (
    <Menu autoSelect={false}>
      <MenuButton
        textTransform="uppercase"
        ml="1.5rem"
        borderRadius="50%"
        variant="primary"
        fontWeight="600"
        fontSize="0.75rem"
        letterSpacing="1px"
      >
        <Flex align="center">
          Compare Scenarios
          <Img ml="5px" src="/svg/dropdown 2.svg" />
        </Flex>
      </MenuButton>
      <MenuList
        minWidth="10rem"
        bg="white"
        width="4rem"
        borderRadius="8px"
        boxShadow="0 2px 2px 0 rgba(0,0,0,0.2)"
      >
        {scenarios.map((scenario) => (
          <MenuItem onClick={() => select(scenario)} key={scenario}>
            <Flex fontWeight="600" align="center" width="100%">
              <CheckBox checked={selectedScenario?.includes(scenario)} />
              {scenario}
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
