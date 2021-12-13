import React from "react";
import { useForm } from "react-hook-form";
import { Button, Flex, Text } from "@chakra-ui/react";
import { SelectDropdown } from "@/components/FormComponents";
import { Section, Container } from "../../components/library";

const UserControllers = ({ active, total }) => {
  const { control, watch, setValue } = useForm({
    defaultValues: {},
  });

  return (
    <Section as="section" my="1.2rem" mb="3rem">
      <Container>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          mb="0.8rem"
        >
          <Text>{`Users (${active} / ${total})`}</Text>
          <Flex alignItems="center">
            <Button
              mr="1rem"
              bg="lightGray"
              width="100px"
              leftIcon={<img src="/svg/reset.svg" />}
              variant="gray"
            >
              Reset
            </Button>
            <Button
              px="1rem"
              maxHeight="2.25rem"
              width="100px"
              fontWeight="600"
              leftIcon={<img src="/svg/save.svg" />}
            >
              Apply
            </Button>
          </Flex>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          width="97.5%"
          as="form"
        >
          <SelectDropdown
            label="user Type"
            placeholder="Select"
            name="userType"
            control={control}
            options={[]}
            boxProps={{ width: "16%", mr: "1rem" }}
            labelProps={{ variant: "bold", fontSize: "0.75rem" }}
            fontSize="0.9rem"
          />
          <SelectDropdown
            label="bu"
            placeholder="Select"
            name="bu"
            control={control}
            options={[]}
            boxProps={{ width: "16%", mr: "1rem" }}
            labelProps={{ variant: "bold", fontSize: "0.75rem" }}
            fontSize="0.9rem"
          />
          <SelectDropdown
            label="modules"
            placeholder="Select"
            name="modules"
            control={control}
            options={[]}
            boxProps={{ width: "16%", mr: "1rem" }}
            labelProps={{ variant: "bold", fontSize: "0.75rem" }}
            fontSize="0.9rem"
          />
          <SelectDropdown
            label="brands"
            placeholder="Select"
            name="brands"
            control={control}
            options={[]}
            boxProps={{ width: "16%", mr: "1rem" }}
            labelProps={{ variant: "bold", fontSize: "0.75rem" }}
            fontSize="0.9rem"
          />
          <SelectDropdown
            label="status"
            placeholder="Select"
            name="status"
            control={control}
            options={[]}
            boxProps={{ width: "16%", mr: "1rem" }}
            labelProps={{ variant: "bold", fontSize: "0.75rem" }}
            fontSize="0.9rem"
          />
          <SelectDropdown
            label="sort"
            placeholder="Select"
            name="sort"
            control={control}
            options={[]}
            boxProps={{ width: "16%", mr: "1rem" }}
            labelProps={{ variant: "bold", fontSize: "0.75rem" }}
            fontSize="0.9rem"
          />
        </Flex>
      </Container>
    </Section>
  );
};

export default UserControllers;
