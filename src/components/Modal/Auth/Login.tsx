import React, { useState } from "react";
import { Button, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import AuthInput from "./AuthInput";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import AuthModalFooter from "./AuthModalFooter";

const Login = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
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

      {error && (
        <Text textAlign="center" color="red.500" fontSize=".85em">
          {FIREBASE_ERRORS[error.message]}
        </Text>
      )}

      <Button variant="solid" w="100%" marginBlock={2} height="36px" type="submit">
        Log In
      </Button>

      <AuthModalFooter
        textContent="New to Reddit?"
        view="signup"
        setAuthModalState={setAuthModalState}
      />
    </form>
  );
};

export default Login;
