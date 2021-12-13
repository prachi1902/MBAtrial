import React, { useState, useRef, useEffect } from "react";
import {
  Flex,
  Img,
  Box,
  IconButton,
  Input,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import ReactImageUploading from "react-images-uploading";

import axios, { responseHandler, errorHandler } from "lib/http";

const EditBrand = ({ data = {} }) => {
  const ref = useRef();
  const [editable, setEditable] = useState(false);
  const [images, setImages] = useState([]);

  const [tempBrand, setTempBrand] = useState(data.brand);

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  useEffect(() => {
    setTempBrand(data.brand);
  }, []);

  useOutsideClick({
    ref: ref,
    handler: () => {
      if (editable) {
        setEditable(false);
        axios({
          url: "/data_mgmt/ui_config/brands",
          params: { brand_id: data.brand_id },
          data: {
            brand_name: tempBrand,
            brand_logo: images.length ? images[0]?.data_url : data.brand_logo,
          },
          method: "put",
        })
          .then(responseHandler)
          .catch(errorHandler);
      }
    },
  });

  return (
    <Flex
      width={editable ? "104%" : "100%"}
      alignItems="center"
      maxHeight="5.5rem"
      mb="0.6rem"
      ref={ref}
      onDoubleClick={() => setEditable(true)}
      bg={editable && "#D8D8D8"}
      py={editable && "1rem"}
      px={editable && "0.7rem"}
      ml={editable && "-0.5rem"}
      border={editable && "1px solid #979797"}
    >
      <Box width="28%" mr={!editable && "1rem"}>
        <ReactImageUploading
          value={images}
          onChange={onChange}
          maxNumber={1}
          dataURLKey="data_url"
        >
          {({ imageList, onImageUpload, onImageRemove }) => (
            <Flex className="upload__image-wrapper" height="75px" width="90px">
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
                    {editable && (
                      <Box top="5px" left="8px" position="absolute">
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
                    )}
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
                  onClick={editable ? onImageUpload : undefined}
                >
                  <Img
                    maxH="100%"
                    maxW="100%"
                    margin="auto"
                    src={data.brand_logo}
                  />
                </Flex>
              )}
            </Flex>
          )}
        </ReactImageUploading>
      </Box>
      <Box width="70%" ml="0.5rem" mr={editable && "1rem"}>
        {editable ? (
          <Input
            defaultValue={tempBrand}
            onChange={(e) => setTempBrand(e.target.value)}
            bg="white"
            style={{ caretColor: "primaryRed" }}
          />
        ) : (
          <Text onDoubleClick={() => setEditable(true)}>{tempBrand}</Text>
        )}
      </Box>
    </Flex>
  );
};

export default EditBrand;
