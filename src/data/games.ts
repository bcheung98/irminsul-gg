import { Game, GameInfo } from "@/types";

export const gameNames = [
    "genshin",
    "hsr",
    "wuwa",
    "zzz",
    "uma",
    "endfield",
] as const;

export const games: Record<Game, GameInfo> = {
    genshin: {
        tag: "genshin",
        name: "Genshin Impact",
        shortName: "Genshin",
        enabled: true,
        color: "rgb(11, 110, 175)",
        dev: "HoYoverse",
    },
    hsr: {
        tag: "hsr",
        name: "Honkai: Star Rail",
        shortName: "HSR",
        enabled: true,
        color: "rgb(168, 53, 179)",
        dev: "HoYoverse",
    },
    wuwa: {
        tag: "wuwa",
        name: "Wuthering Waves",
        shortName: "WuWa",
        enabled: true,
        color: "rgb(131, 106, 53)",
        dev: "Kuro Games",
    },
    zzz: {
        tag: "zzz",
        name: "Zenless Zone Zero",
        shortName: "ZZZ",
        enabled: true,
        color: "rgb(209, 111, 12)",
        dev: "HoYoverse",
    },
    uma: {
        tag: "uma",
        name: "Umamusume: Pretty Derby",
        shortName: "Uma",
        enabled: true,
        color: "rgb(44, 159, 4)",
        dev: "Cygames",
    },
    endfield: {
        tag: "endfield",
        name: "Arknights: Endfield",
        shortName: "Endfield",
        enabled: true,
        color: "rgb(255, 211, 136)",
        dev: "Gryphline",
    },
} as const;
