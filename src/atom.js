import { atom } from "recoil";

export const userAtom = atom({
  key: "user",
  default: null,
});
export const userIsLoadedAtom = atom({
  key: "userIsLoaded",
  default: false,
});
export const reRenderAtom = atom({
  key: "reRender",
  default: false,
});
export const isBlockedAtom = atom({
  key: "isBlocked",
  default: false,
});
export const widthAtom = atom({
  key: "width",
  default: window.innerWidth,
});
export const isMobileAtom = atom({
  key: "isMobile",
  default: false,
});
