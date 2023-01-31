import { atom } from "recoil";

// Interface for the authModalState
export interface AuthModalState {
  open: boolean;
  view: "login" | "signup" | "resetPassword"
}

// Default state of authModalState
const defaultModalState: AuthModalState = {
  open: false,
  view: "login"
}

export const authModalState = atom<AuthModalState>({
  key: 'authModalState', // unique ID (with respect to other atoms/selectors)
  default: defaultModalState, // default value (aka initial value)
});