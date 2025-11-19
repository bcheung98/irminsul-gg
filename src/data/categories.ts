import { GameData } from "@/types";

export const categories: GameData<Record<string, string>> = {
    genshin: {
        characters: "Characters",
        weapons: "Weapons",
        equipment: "Artifacts",
    },
    hsr: {
        characters: "Characters",
        weapons: "Light Cones",
        equipment: "Relics",
    },
    wuwa: {
        characters: "Resonators",
        weapons: "Weapons",
        equipment: "Echoes",
    },
    zzz: {
        characters: "Agents",
        weapons: "W-Engines",
        equipment: "Drive Discs",
        bangboo: "Bangboo",
    },
    uma: {
        characters: "Characters",
        cards: "Support Cards",
    },
};
