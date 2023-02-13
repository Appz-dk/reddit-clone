import { Flex, Icon, Image, MenuItem, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IconType } from "react-icons/lib";
import useDropdownMenu from "../../../hooks/useDropdownMenu";

type MenuListItemProps = {
  imageURL?: string;
  displayText: string;
  iconColor: string;
  icon: IconType;
  link: string;
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  imageURL,
  displayText,
  icon,
  iconColor,
  link,
}) => {
  const { communityId } = useRouter().query;
  const { onSelectMenuItem } = useDropdownMenu();

  const handleOnSelectMenuItem = (firstLoad: boolean = false) => {
    onSelectMenuItem(
      {
        imageURL,
        displayText,
        icon,
        iconColor,
        link,
      },
      firstLoad
    );
  };

  // Solves always default dropdownMenuState on page refresh
  useEffect(() => {
    if (displayText.split("/")[1] === communityId) {
      handleOnSelectMenuItem(true);
    }
  }, []);

  return (
    <MenuItem w="full" _hover={{ bg: "gray.100" }} onClick={() => handleOnSelectMenuItem()}>
      <Flex gap="1" align="center">
        {imageURL && <Image src={imageURL} boxSize="5" borderRadius="full" />}
        {!imageURL && <Icon as={icon} boxSize="5" color={iconColor} />}
        <Text fontSize=".75rem">{displayText}</Text>
      </Flex>
    </MenuItem>
  );
};

export default MenuListItem;
