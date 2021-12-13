import React, { useState } from "react";
import {
  Flex,
  Text,
  Img,
  Button,
  Box,
  IconButton,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Page, ModalWrapper } from "components/library";
import { TextArea } from "components/FormComponents";
import axios, { responseHandler, errorHandler } from "@/lib/http";

const AddToDeckModal = ({ data, setData, title = "", property = "" }) => {
  const { register, handleSubmit, watch } = useForm();
  const [loading, setLoading] = useState(false);

  const titleValue = watch("title");

  const onSubmit = (payload) => {
    setLoading(true);
    axios({
      method: "post",
      url: "/my_deck/new",
      data: {
        deck_page_title: titleValue,
        deck_page_note: payload.notes,
        deck_pic: data.data,
      },
    })
      .then(responseHandler)
      .then((data) => {
        setData({ open: false });
      })
      .catch(errorHandler)
      .finally(() => setLoading(false));
  };

  return (
    <ModalWrapper isOpen={data.open}>
      <Page as="form" onSubmit={handleSubmit(onSubmit)} p="0" width="90%">
        <Flex pt="2rem" px="1.5rem" mb="1rem" justify="space-between">
          <Text>My deck</Text>
          <Flex
            width="70%"
            justify="space-between"
            align="center"
            border="solid 1px #bdbdbd"
            borderRadius="4px"
            px="1rem"
          >
            <Text color="#aaa" fontSize="0.875rem">
              PAGE TITLE
            </Text>
            <Editable
              tabIndex="0"
              width="80%"
              defaultValue={property + " " + title}
            >
              <EditablePreview textAlign="center" width="100%" />
              <EditableInput
                width="100%"
                textAlign="center"
                {...register("title")}
              />
            </Editable>
            <Box width="76px" />
          </Flex>
          <Flex>
            <Button
              px="0.9rem"
              height="2.25rem"
              fontSize="1rem"
              variant="primary"
              mr="1rem"
              type="submit"
              isLoading={loading}
              leftIcon={<Img mr="0.4rem" src="/svg/save.svg" />}
            >
              Save
            </Button>
            <IconButton
              onClick={() => setData({ open: false, data: "" })}
              variant="gray"
              isRound={true}
              borderRadius="50%"
              icon={<Img src="/svg/close2.svg" />}
            />
          </Flex>
        </Flex>
        <Img
          mx="auto"
          height="320px"
          width="1250px"
          src={`data:image/png;base64,${data.data}`}
        />
        <Flex
          justify="center"
          position="relative"
          py="2rem"
          mt="1rem"
          borderBottomRadius="8px"
          width="100%"
          height="15rem"
          bg="#f2f2f2"
        >
          <TextArea
            redLabel
            border="solid 1px #D6D6D6 !important"
            width="100%"
            height="100%"
            boxShadow="none"
            boxProps={{ width: "85%", height: "100%" }}
            {...register("notes")}
          />
        </Flex>
      </Page>
    </ModalWrapper>
  );
};

export default AddToDeckModal;
