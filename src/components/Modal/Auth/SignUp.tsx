import React, { useState } from "react";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

const SignUp = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // TODO: Add firebase login inside of submit function
  const onSubmitHandler = () => {};

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

      <Input
        required
        placeholder="Confirm Password"
        name="confirmPassword"
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
        Sign Up
      </Button>

      <Flex fontSize=".75em" justifyContent="center">
        <Text mr={1}>Already a redditor?</Text>
        <Text
          onClick={() => {
            setAuthModalState((prev) => ({ ...prev, view: "login" }));
          }}
          textTransform="uppercase"
          color="blue.500"
          fontWeight="700"
          cursor="pointer"
        >
          Log In
        </Text>
      </Flex>
    </form>
  );
};

export default SignUp;
