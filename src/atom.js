import { atom } from "recoil";

export const isLoggedInAtom = atom({
  key: "isLoggedIn",
  default: true,
});

export const isAdminAtom = atom({
  key: "isAdmin",
  default: true,
});
