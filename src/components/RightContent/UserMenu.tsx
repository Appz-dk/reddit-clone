import React from "react";
import { Menu } from "@chakra-ui/react";
import { User } from "firebase/auth";
import UserMenuLoggedIn from "./UserMenuLoggedIn";
import UserMenuLoggedOut from "./UserMenuLoggedOut";

type UserMenuProps = {
  user: User | null | undefined;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  return (
    <Menu>
      {user && <UserMenuLoggedIn user={user} />}
      {!user && <UserMenuLoggedOut />}
    </Menu>
  );
};

export default UserMenu;
