import { Flex, Icon, Text } from "@chakra-ui/react";
import { TabItemType } from "./NewPostForm";

type TabItemProps = {
  item: TabItemType;
  isSelected: boolean;
  onSetSelectedTab: (title: string) => void;
};

const TabItem: React.FC<TabItemProps> = ({ item, isSelected, onSetSelectedTab }) => {
  return (
    <Flex
      align="center"
      justify="center"
      flexGrow="1"
      paddingBlock="3"
      cursor="pointer"
      fontWeight="700"
      fontSize=".75rem"
      borderRightColor="gray.200"
      _hover={{ bg: "gray.50" }}
      color={isSelected ? "blue.500" : "gray.500"}
      borderWidth={isSelected ? "0 1px 2px 0" : "0 1px 1px 0"}
      borderBottomColor={isSelected ? "blue.500" : "gray.200"}
      onClick={() => onSetSelectedTab(item.title)}
    >
      <Icon as={item.icon} mr="2" fontSize="1rem" />
      <Text>{item.title}</Text>
    </Flex>
  );
};

export default TabItem;
