import React, { useEffect, useState } from "react";
import { Button, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import AuthInput from "./AuthInput";
import AuthModalFooter from "./AuthModalFooter";
import { User } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [error, setError] = useState("");
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [createUserWithEmailAndPassword, userCreated, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset any previous errors
    if (error) setError("");
    // Check for valid email
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signUpForm.email)) {
      setError("Invalid Email Address");
      return;
    }
    // Check for matching passwords
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Create the user using the hook
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // TODO: Make into Custom Hook
  // Alternative to firebase functions (since it's a "paid" option)
  const createUserDocument = async (user: User) => {
    const usersDocRef = doc(firestore, "users", user.uid);
    await setDoc(usersDocRef, JSON.parse(JSON.stringify(user)));
  };
  // Calls the createUserDocument every time a user is created
  useEffect(() => {
    if (userCreated) {
      createUserDocument(userCreated.user);
    }
  }, [userCreated]);

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

      <AuthInput
        required={true}
        placeholder="Confirm Password"
        name="confirmPassword"
        type="password"
        onChange={onChangeHandler}
      />

      <Text textAlign="center" color="red.500" fontSize=".85rem">
        {error || (userError && FIREBASE_ERRORS[userError.message])}
      </Text>

      <Button
        variant="solid"
        w="100%"
        marginBlock={2}
        height="36px"
        type="submit"
        isLoading={loading}>
        Sign Up
      </Button>

      <AuthModalFooter
        textContent="Already a redditor?"
        view="login"
        setAuthModalState={setAuthModalState}
      />
    </form>
  );
};

export default SignUp;
