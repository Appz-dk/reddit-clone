import { Input } from "@chakra-ui/react";
import React from "react";

type AuthInputProps = {
  placeholder: string;
  name: string;
  type: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AuthInput: React.FC<AuthInputProps> = ({
  placeholder,
  name,
  type,
  required = false,
  onChange,
}) => {
  return (
    <Input
      required={required}
      placeholder={placeholder}
      name={name}
      type={type}
      fontSize=".85rem"
      mb={2}
      bg="blue.50"
      _placeholder={{ color: "gray.600" }}
      _hover={{ border: "1px solid", borderColor: "blue.500", bg: "white" }}
      _focus={{ border: "1px solid", borderColor: "blue.500", outline: "none" }}
      onChange={onChange}
    />
  );
};

export default AuthInput;
