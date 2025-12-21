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
    "zzz/bangboos": "Bangboos",
    "uma/characters": "Characters",
    "uma/supports": "Support Cards",
};

export const categoryURLs: Record<string, string> = {
    "genshin/characters": "genshin/characters",
    "genshin/weapons": "genshin/weapons",
    "genshin/equipment": "genshin/artifacts",
    "hsr/characters": "hsr/characters",
    "hsr/weapons": "hsr/lightcones",
    "hsr/equipment": "hsr/relics",
    "wuwa/characters": "wuwa/resonators",
    "wuwa/weapons": "wuwa/weapons",
    "wuwa/equipment": "wuwa/echoes",
    "zzz/characters": "zzz/agents",
    "zzz/weapons": "zzz/w-engines",
    "zzz/equipment": "zzz/drive-discs",
    "zzz/bangboos": "zzz/bangboos",
    "uma/characters": "uma/characters",
    "uma/weapons": "uma/supports", // Need this for category sorting
    "uma/supports": "uma/supports",
};

export const categoryImgURLs: Record<
    string,
    (args0?: any, args1?: any) => string
> = {
    "genshin/characters": (id: number) => `genshin/characters/${id}`,
    "genshin/weapons": (id: number) => `genshin/weapons/${id}`,
    "genshin/equipment": (id: number, name: string) =>
        `genshin/artifacts/${id}${name.startsWith("Prayers") ? "_5" : "_1"}`,
    "hsr/characters": (id: number) => `hsr/characters/${id}`,
    "hsr/weapons": (id: number) => `hsr/lightcones/${id}_icon`,
    "hsr/equipment": (id: number) => `hsr/relics/${id}`,
    "wuwa/characters": (id: number) => `wuwa/resonators/${id}`,
    "wuwa/weapons": (id: number) => `wuwa/weapons/${id}`,
    "wuwa/equipment": (id: number) => `wuwa/echoes/${id}`,
    "zzz/characters": (id: number) => `zzz/agents/${id}`,
    "zzz/weapons": (id: number) => `zzz/w-engines/${id}`,
    "zzz/equipment": (id: number) => `zzz/drive-discs/${id}`,
    "zzz/bangboos": (id: number) => `zzz/bangboos/${id}`,
    "uma/characters": (id: number) => `uma/characters/${id}`,
    "uma/weapons": (id: number) => `uma/supports/${id}_icon`, // Need this for category sorting
    "uma/supports": (id: number) => `uma/supports/${id}_icon`,
};
