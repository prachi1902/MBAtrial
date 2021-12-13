import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Img,
  IconButton,
  Button,
  Collapse,
} from "@chakra-ui/react";

import { Checkbox } from "@/components/FormComponents";

const ModuleAccessUnit = ({
  subModules,
  title,
  selectedModules,
  setSelectedModules,
}) => {
  const [expand, setExpand] = useState(false);
  return (
    <Box maxWidth="95%" alignItems="center" pb="0.6rem" position="relative">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex align="center">
          <Checkbox
            checked={selectedModules[title]?.length === subModules.length}
            onChange={() => {
              if (selectedModules[title]?.length === subModules.length) {
                setSelectedModules({ ...selectedModules, [title]: [] });
              } else {
                setSelectedModules({ ...selectedModules, [title]: subModules });
              }
            }}
            inviteUser={true}
          />
          <Box ml="0.5rem" mt={expand && "-0.25rem"}>
            <Text fontSize="0.96rem">{title}</Text>
          </Box>
        </Flex>
        {expand ? (
          <IconButton
            bg="none"
            display="flex"
            align="center"
            border="none"
            icon={<Img src="/svg/collapse.svg" />}
            onClick={() => setExpand(false)}
          />
        ) : (
          <IconButton
            bg="none"
            display="flex"
            align="center"
            border="none"
            icon={<Img src="/svg/expand.svg" />}
            onClick={() => setExpand(true)}
          />
        )}
      </Flex>
      <Collapse in={expand} animateOpacity>
        <Flex ml="1.5rem" flexWrap="wrap">
          {subModules.map((data, i) => (
            <Button
              key={i}
              mb="0.2rem"
              mr="0.3rem"
              variant={
                selectedModules[title]?.includes(data) ? "primary" : "basic"
              }
              onClick={() => {
                if (selectedModules[title]?.includes(data)) {
                  let newArray = [...selectedModules[title]];
                  let index = newArray.indexOf(data);
                  newArray.splice(index, 1);
                  setSelectedModules({
                    ...selectedModules,
                    [title]: newArray,
                  });
                } else {
                  setSelectedModules({
                    ...selectedModules,
                    [title]: selectedModules[title]
                      ? [...selectedModules[title], data]
                      : [data],
                  });
                }
              }}
              size="sm"
              border={
                selectedModules[title]?.includes(data)
                  ? "solid 1px #B27831 !important"
                  : "solid 1px lightGray"
              }
              color={
                selectedModules[title]?.includes(data) ? "black" : "darkGray"
              }
              boxShadow="none"
              fontWeight="normal"
              borderRadius="4px"
              px="0.75rem"
              py="1rem"
              fontSize="0.8rem"
            >
              {data}
            </Button>
          ))}
        </Flex>
      </Collapse>
    </Box>
  );
};

export default ModuleAccessUnit;
