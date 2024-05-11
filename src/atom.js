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
