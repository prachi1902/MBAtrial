import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  FormLabel,
  IconButton,
  Img,
  Button,
} from "@chakra-ui/react";
import ReactImageUploading from "react-images-uploading";
import { useForm } from "react-hook-form";

import axios, { responseHandler, errorHandler } from "lib/http";
import { ModalWrapper, Page } from "@/components/library";
import { InputBudget } from "@/components/FormComponents";
import { errorToast, successToast } from "@/components/Toasts";

const AddBrandModal = ({ open, setOpen }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const submit = (data) => {
    if (images.length) {
      setLoading(true);
      axios({
        url: "/data_mgmt/ui_config/brands",
        method: "post",
        data: {
          ...data,
          brand_logo: images[0]?.data_url,
          //   logo: "string",
        },
      })
        .then(responseHandler)
        .then((res) => {
          successToast("Country Added Successfully");
          setOpen(false);
        })
        .catch(errorHandler)
        .finally(() => setLoading(false));
    } else {
      errorToast("Please Select a Flag.");
    }
  };

  return (
    <ModalWrapper isOpen={open}>
      <Page
        as="form"
        onSubmit={handleSubmit(submit)}
        mt="3rem"
        p="1rem"
        px="1.5rem"
        width="58%"
      >
        <Flex align="center" justifyContent="space-between">
          <Text width="150px">Add Brand</Text>
          <Flex>
            <Button isLoading={loading} type="submit">
              Save
            </Button>
            <IconButton
              type="button"
              borderRadius="50%"
              ml="1rem"
              maxH="none"
              onClick={() => setOpen(false)}
              icon={<Img src="/svg/close2.svg" />}
              variant="gray"
              bg="lightGray"
            />
          </Flex>
        </Flex>
        <Box width="80%">
          <Box mb="1rem">
            <InputBudget
              label="brand name"
              errors={errors}
              {...register("brand_name", { required: "Required" })}
            />
          </Box>
          <FormLabel>Logo</FormLabel>
          <ReactImageUploading
            value={images}
            onChange={onChange}
            maxNumber={1}
            dataURLKey="data_url"
          >
            {({ imageList, onImageUpload, onImageRemove }) => (
              <Flex
                className="upload__image-wrapper"
                height="75px"
                width="90px"
              >
                {imageList.length > 0 ? (
                  imageList.map((image, index) => (
                    <Box key={index} className="image-item" position="relative">
                      <Box
                        bg="white"
                        borderRadius="5px"
                        height="100%"
                        border="1px solid #ddd"
                        width="90px"
                        onClick={onImageUpload}
                        position="relative"
                      >
                        <Img src={image["data_url"]} maxH="100%" maxW="100%" />
                      </Box>
                      <Box top="3px" left="5px" position="absolute">
                        <IconButton
                          variant="gray"
                          isRound={true}
                          icon={<Img src="/svg/close2.svg" />}
                          onClick={() => onImageRemove(index)}
                          border="1px solid darkGray"
                          minWidth="1.3rem"
                          maxHeight="1.3rem"
                        />
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Flex
                    bg="#efefef"
                    border="1px solid #ddd"
                    margin="auto"
                    alignItems="center"
                    justifyContent="center"
                    height="76px"
                    width="90px"
                    onClick={onImageUpload}
                  >
                    <Img margin="auto" src="/svg/upload.svg" />
                  </Flex>
                )}
              </Flex>
            )}
          </ReactImageUploading>
        </Box>
      </Page>
    </ModalWrapper>
  );
};

export default AddBrandModal;
