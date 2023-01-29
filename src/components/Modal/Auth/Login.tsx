import React, { useState } from "react";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

const Login = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // TODO: Add firebase login inside of submit function
  const onSubmitHandler = () => {};

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Input
        required
        placeholder="Email"
        name="email"
        type="email"
        fontSize=".85rem"
        mb={2}
        bg="blue.50"
        _placeholder={{ color: "gray.600" }}
        _hover={{ border: "1px solid", borderColor: "blue.500", bg: "white" }}
        _focus={{ border: "1px solid", borderColor: "blue.500", outline: "none" }}
        onChange={onChangeHandler}
      />

      <Input
        required
        placeholder="Password"
        name="password"
        type="password"
        fontSize=".85rem"
        mb={2}
        bg="blue.50"
        _placeholder={{ color: "gray.600" }}
        _hover={{ border: "1px solid", borderColor: "blue.500", bg: "white" }}
        _focus={{ border: "1px solid", borderColor: "blue.500", outline: "none" }}
        onChange={onChangeHandler}
      />
      <Button variant="solid" w="100%" marginBlock={2} height="36px" type="submit">
        Log In
      </Button>
      <Flex fontSize=".75em" justifyContent="center">
        <Text mr={1}>New to Reddit?</Text>
        <Text
          onClick={() => {
            setAuthModalState((prev) => ({ ...prev, view: "signup" }));
          }}
          textTransform="uppercase"
          color="blue.500"
          fontWeight="700"
          cursor="pointer"
        >
          Sign Up
        </Text>
      </Flex>
    </form>
  );
};

export default Login;
