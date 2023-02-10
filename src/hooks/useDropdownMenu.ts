import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { DropdownMenuItem, dropdownMenuState } from "../atoms/dropdownMenuAtom";

const useDropdownMenu = () => {
  const router = useRouter()
  const [dropdownState, setDropdownState] = useRecoilState(dropdownMenuState)

  const onSelectMenuItem = (menuItem: DropdownMenuItem) => {
    setDropdownState(prev => ({
      ...prev,
      selectedMenuItem: menuItem
    }))

    router.push(menuItem.link)
  }

  const toggleMenuOpen = () => {
    setDropdownState(prev => ({
      ...prev,
      isOpen: !prev.isOpen
    }))
  }

  const closeMenu = () => {
    setDropdownState(prev => ({
      ...prev,
      isOpen: false
    }))
  }

  return { dropdownState, toggleMenuOpen, closeMenu, onSelectMenuItem }
};

export default useDropdownMenu;
