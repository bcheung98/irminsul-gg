import { splitJoin } from "@/utils";

export const categories: Record<string, string> = {
    "genshin/characters": "Characters",
    "genshin/weapons": "Weapons",
    "genshin/equipment": "Artifacts",
    "hsr/characters": "Characters",
    "hsr/weapons": "Light Cones",
    "hsr/equipment": "Relics",
    "wuwa/characters": "Resonators",
    "wuwa/weapons": "Weapons",
    "wuwa/equipment": "Echoes",
    "zzz/characters": "Agents",
    "zzz/weapons": "W-Engines",
    "zzz/equipment": "Drive Discs",
    "zzz/bangboo": "Bangboo",
    "uma/characters": "Characters",
    "uma/supports": "Support Cards",
};

export const categoryImgURLs: Record<string, (args?: any) => string> = {
    "genshin/characters": (name: string) =>
        `genshin/characters/avatars/${splitJoin(name)}`,
    "genshin/weapons": (name: string) => `genshin/weapons/${splitJoin(name)}`,
    "genshin/equipment": (name: string) =>
        `genshin/artifacts/sets/${splitJoin(name)}/${
            name.startsWith("Prayers") ? "circlet" : "flower"
        }`,
};
