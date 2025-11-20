import { splitJoin } from "@/utils";

export const categories: Record<string, string> = {
    "genshin/characters": "Characters",
    "genshin/weapons": "Weapons",
    "genshin/artifacts": "Artifacts",
    "hsr/characters": "Characters",
    "hsr/lightcones": "Light Cones",
    "hsr/relics": "Relics",
    "wuwa/resonators": "Resonators",
    "wuwa/weapons": "Weapons",
    "wuwa/echoes": "Echoes",
    "zzz/agents": "Agents",
    "zzz/w-engines": "W-Engines",
    "zzz/drive-discs": "Drive Discs",
    "zzz/bangboo": "Bangboo",
    "uma/characters": "Characters",
    "uma/supports": "Support Cards",
};

export const categoryImgURLs: Record<string, (args?: any) => string> = {
    "genshin/characters": (name: string) =>
        `genshin/characters/avatars/${splitJoin(name)}`,
    "genshin/weapons": (name: string) => `genshin/weapons/${splitJoin(name)}`,
    "genshin/artifacts": (name: string) =>
        `genshin/artifacts/sets/${splitJoin(name)}/${
            name.startsWith("Prayers") ? "circlet" : "flower"
        }`,
};
