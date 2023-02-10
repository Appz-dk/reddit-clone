import { IconType } from "react-icons/lib"
import { TiHome } from "react-icons/ti"
import { atom } from "recoil"

export type DropDownMenuItem = {
  imageURL?: string
  displayText: string
  icon: IconType
  iconColor: string
  link: string
}

interface DropDownMenuState {
  isOpen: boolean
  selectedMenuItem: DropDownMenuItem
}

export const defaultMenuItem: DropDownMenuItem = {
  displayText: "Home",
  icon: TiHome,
  iconColor: "black",
  link: "/",
}

export const defaultMenuState: DropDownMenuState = {
  isOpen: false,
  selectedMenuItem: defaultMenuItem
}

export const DropDownMenuState = atom<DropDownMenuState>({
  key: "dropDownMenuState",
  default: defaultMenuState
})