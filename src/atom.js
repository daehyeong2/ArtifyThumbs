import { atom } from "recoil";

export const isRequestedAtom = atom({
  key: "isRequested",
  default: false,
});

export const userAtom = atom({
  key: "user",
  default: null,
});
