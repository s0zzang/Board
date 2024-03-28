import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "memverState",
  storage: sessionStorage,
});

export const memberState = atom({
  key: "memberState",
  default: null,
  effects: [persistAtom],
});
