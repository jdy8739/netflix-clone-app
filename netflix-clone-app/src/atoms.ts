import { atom } from "recoil";
import { ITopRatedResult } from "./api";


export const movieAtom = atom<ITopRatedResult | null>({
    key: 'movieAtom',
    default: null
});