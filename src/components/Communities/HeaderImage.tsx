import { Icon, Image } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";

type HeaderImageProps = {
  imageUrl?: string;
};
const HeaderImage: React.FC<HeaderImageProps> = ({ imageUrl }) => {
  return (
    <>
      {imageUrl && <Image />}
      {!imageUrl && (
        <Icon
          as={FaReddit}
          fontSize="4rem"
          position="relative"
          top="-3"
          color="blue.500"
          padding="4px"
          bg="white"
          borderRadius="100%"
        />
      )}
    </>
  );
};

export default HeaderImage;
