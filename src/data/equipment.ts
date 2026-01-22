import { GameData } from "@/types";

export const equipmentTags: GameData<string> = {
    genshin: "artifacts",
    hsr: "relics",
    wuwa: "echoes",
    zzz: "drive-discs",
    uma: "",
    endfield: "",
};

export const equipmentPieceType: GameData<Record<string, string>> = {
    genshin: {
        flower: "Flower of Life",
        feather: "Plume of Death",
        sands: "Sands of Eon",
        goblet: "Goblet of Eonothem",
        circlet: "Circlet of Logos",
    },
    hsr: {
        head: "Head",
        hand: "Hands",
        body: "Body",
        feet: "Feet",
        orb: "Planar Sphere",
        rope: "Link Rope",
    },
    wuwa: {},
    zzz: {},
    uma: {},
    endfield: {},
};
