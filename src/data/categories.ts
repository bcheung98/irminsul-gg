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

export const categoryImgURLs: Record<
    string,
    (args0?: any, args1?: any) => string
> = {
    "genshin/characters": (id: number) => `genshin/characters/${id}`,
    "genshin/weapons": (id: number) => `genshin/weapons/${id}`,
    "genshin/equipment": (id: number, name: string) =>
        `genshin/artifacts/${id}${name.startsWith("Prayers") ? "_5" : "_1"}`,
};
