import { Flex, Icon, Image } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";

type HeaderImageProps = {
  imageUrl?: string;
};

const HeaderImage: React.FC<HeaderImageProps> = ({ imageUrl }) => {
  return (
    <Flex
      align="center"
      justify="center"
      position="relative"
      top="-25%"
      border="4px solid white"
      borderRadius="100%"
      bg="white"
    >
      {imageUrl && (
        <Image src={imageUrl} boxSize="40px" borderRadius="full" alt="Logo of the community" />
      )}
      {!imageUrl && (
        <Icon
          as={FaReddit}
          fontSize="3rem"
          boxSize="40px"
          color="blue.500"
          bg="white"
          borderRadius="100%"
        />
      )}
    </Flex>
  );
};

export default HeaderImage;
