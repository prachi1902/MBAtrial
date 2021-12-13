import React, { useEffect } from "react";
import { Flex, Text, Img, Box, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import { FormInput } from "@/components/FormComponents";

const SecondLogin = () => {
  const { register } = useForm();

  return (
    <Flex
      height={{ xs: "max-content", lg: "100vh" }}
      justifyContent="center"
      width="100vw"
      backgroundImage="url('png/login_bg.png')"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box
        mt="5.7rem"
        height="31.6rem"
        borderRadius="7px"
        width="28%"
        boxShadow="0px 5px 15px rgba(0,0,0,0.075)"
        bg="#fafafa"
        zIndex="10"
      >
        <Box pt="1.35rem">
          <Flex
            width="100%"
            alignItems="center"
            justifyContent="center"
            mb="1.3rem"
            px="1.5rem"
          >
            <Img src="/svg/ABI logo color.svg" mr="0.7rem" />
            <Img src="/svg/mba logo red.svg" />
          </Flex>

          <Flex position="relative" mb="2.5rem" px="1.5rem">
            <Box
              position="absolute"
              borderTop="1px solid lightGray"
              width="110px"
              left="0px"
              top="9px"
            ></Box>
            <Text
              textTransform="uppercase"
              letterSpacing="0.05rem"
              fontSize="0.8rem"
              color="black"
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
            >
              media budget allocator
            </Text>
            <Box
              position="absolute"
              borderTop="1px solid lightGray"
              width="110px"
              top="9px"
              right="0px"
            ></Box>
          </Flex>
          <Flex
            border="7px solid transparent"
            style={{
              borderImage:
                "linear-gradient(180deg, #FCD5A5 0%, #F9AA4A 100%) 1",
            }}
            width="110%"
            ml="-1.25rem"
            my="1rem"
            bg="linear-gradient(180deg, #FDE3C3 0%, #FACB91 100%)"
            height="11.25rem"
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <Img
                src="/png/user.png"
                margin="auto"
                border="1px solid white"
                borderRadius="50%"
                width="6rem"
                height="6rem"
              />
              <Text>Benjamin Taylor</Text>
            </Box>
          </Flex>
          <Box px="1.5rem">
            <Box mb="1rem">
              <FormInput
                {...register("password")}
                label="PASSWORD"
                type="password"
                icon={<Img height="30px" src="svg/show.svg" />}
                height="3.375rem"
                backgroundColor="#e8e8e8"
              />
            </Box>
            <Flex mt="1rem" alignItems="center" justifyContent="space-between">
              <Button
                variant="ghost"
                fontSize="0.87rem"
                fontWeight="500"
                px="0"
                textDecoration="underline"
              >
                Forgot Password
              </Button>
              <Button
                leftIcon={<Img boxSize="24px" mr="5px" src="/svg/Login.svg" />}
                variant="primary"
                type="submit"
                fontWeight="500"
                onClick={() => router.push("/media-planner")}
                color="black"
                maxHeight="2.25rem"
                width="6.25rem"
              >
                Login
              </Button>
            </Flex>

            <Flex mt="0.5rem" alignItems="center" justifyContent="center">
              <Button
                variant="ghost"
                fontSize="0.87rem"
                fontWeight="500"
                px="0"
                textDecoration="underline"
              >
                Login With Different Account
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default SecondLogin;
