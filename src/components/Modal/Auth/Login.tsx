import React, { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import AuthInput from "./AuthInput";

const Login = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <AuthInput
        required={true}
        placeholder="Email"
        name="email"
        type="email"
        onChange={onChangeHandler}
      />

      <AuthInput
        required={true}
        placeholder="Password"
        name="password"
        type="password"
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
          cursor="pointer">
          Sign Up
        </Text>
      </Flex>
    </form>
  );
};

export default Login;
