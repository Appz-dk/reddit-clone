import { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "60px",
    fontSize: ".85rem",
    fontWeight: "700",
    _focus: {
      boxShadow: "none"
    }
  },
  sizes: {
    sm: {
      fontSize: ".65rem"
    },
    md: {
      fontSize: ".85rem"
    }
  },
  variants: {
    solid: {
      color: "white",
      bg: "blue.500",
      _hover: {
        bg: "blue.400"
      }
    },
    // Maybe add a hover ???
    outline: {
      border: "1px solid",
      borderColor: "blue.500",
      color: "blue.500",
      bg: "white",
    },
    oauth: {
      height: "34px",
      border: "1px solid",
      borderColor: "gray.300",
      _hover: {
        borderColor: "gray.100"
      }
    }
  }
}