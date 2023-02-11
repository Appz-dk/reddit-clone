import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { DropdownMenuItem, dropdownMenuState } from "../atoms/dropdownMenuAtom";

const useDropdownMenu = () => {
  const router = useRouter()
  const [dropdownState, setDropdownState] = useRecoilState(dropdownMenuState)

  const onSelectMenuItem = (menuItem: DropdownMenuItem, skipRedirect: boolean = false) => {
    setDropdownState(prev => ({
      ...prev,
      selectedMenuItem: menuItem
    }))

    // Skip the redirect on page refresh or user loading straigth to /r/community
    if (!skipRedirect) {
      router.push(menuItem.link)
    }
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
