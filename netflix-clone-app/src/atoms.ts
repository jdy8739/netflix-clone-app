import { atom } from "recoil";
import { INowPlayingResult, ITopRatedResult } from "./api";
import { ITvPopularResult } from "./tvApi";

export const movieAtom = atom<ITopRatedResult | null>({
    key: 'movieAtom',
    default: null
});

export const bannerAtom = atom<INowPlayingResult | null>({
    key: 'bannerAtom',
    default: null
});

export const tvBannerAtom = atom<ITvPopularResult | null>({
    key: 'tvBannerAtom',
    default: null
});