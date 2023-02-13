import { IconType } from "react-icons/lib"
import { TiHome } from "react-icons/ti"
import { atom } from "recoil"

export type DropdownMenuItem = {
  imageURL?: string
  displayText: string
  icon: IconType
  iconColor: string
  link: string
}

interface DropdownMenuState {
  isOpen: boolean
  selectedMenuItem: DropdownMenuItem
}

export const defaultMenuItem: DropdownMenuItem = {
  displayText: "Home",
  icon: TiHome,
  iconColor: "black",
  link: "/",
}

export const defaultMenuState: DropdownMenuState = {
  isOpen: false,
  selectedMenuItem: defaultMenuItem
}

export const dropdownMenuState = atom<DropdownMenuState>({
  key: "dropdownMenuState",
  default: defaultMenuState
})
