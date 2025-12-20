import { Events, EventTypes } from "@/types/uma/event";

export const urls = {
    // Genshin
    "genshin/characters": "https://api.irminsul.gg/v2/genshin/characters.json",
    "genshin/weapons": "https://api.irminsul.gg/v2/genshin/weapons.json",
    "genshin/artifacts": "https://api.irminsul.gg/v2/genshin/artifacts.json",
    "genshin/banner-characters":
        "https://api.irminsul.gg/v2/genshin/banner-characters.json",
    "genshin/banner-weapons":
        "https://api.irminsul.gg/v2/genshin/banner-weapons.json",
    "genshin/banner-chronicled":
        "https://api.irminsul.gg/v2/genshin/banner-chronicled.json",
    // HSR
    "hsr/characters": "https://api.irminsul.gg/v2/hsr/characters.json",
    "hsr/lightcones": "https://api.irminsul.gg/v2/hsr/weapons.json",
    "hsr/relics": "https://api.irminsul.gg/v2/hsr/relics.json",
    "hsr/banner-characters":
        "https://api.irminsul.gg/v2/hsr/banner-characters.json",
    "hsr/banner-weapons": "https://api.irminsul.gg/v2/hsr/banner-weapons.json",
    // WuWa
    "wuwa/resonators": "https://api.irminsul.gg/v2/wuwa/characters.json",
    "wuwa/weapons": "https://api.irminsul.gg/v2/wuwa/weapons.json",
    "wuwa/echoes": "https://api.irminsul.gg/v2/wuwa/echoes.json",
    "wuwa/banner-characters":
        "https://api.irminsul.gg/v2/wuwa/banner-characters.json",
    "wuwa/banner-weapons":
        "https://api.irminsul.gg/v2/wuwa/banner-weapons.json",
    // ZZZ
    "zzz/agents": "https://api.irminsul.gg/v2/zzz/characters.json",
    "zzz/w-engines": "https://api.irminsul.gg/v2/zzz/weapons.json",
    "zzz/drive-discs": "https://api.irminsul.gg/v2/zzz/drive-discs.json",
    "zzz/bangboos": "https://api.irminsul.gg/v2/zzz/bangboo.json",
    "zzz/banner-characters":
        "https://api.irminsul.gg/v2/zzz/banner-characters.json",
    "zzz/banner-weapons": "https://api.irminsul.gg/v2/zzz/banner-weapons.json",
    // Umamusume
    "uma/characters": "https://api.irminsul.gg/v2/uma/characters.json",
    "uma/character-profiles":
        "https://api.irminsul.gg/v2/uma/character-profiles.json",
    "uma/supports": "https://api.irminsul.gg/v2/uma/supports.json",
    "uma/skills": "https://api.irminsul.gg/v2/uma/skills.json",
    "uma/banner-characters":
        "https://api.irminsul.gg/v2/uma/banner-characters.json",
    "uma/banner-supports":
        "https://api.irminsul.gg/v2/uma/banner-supports.json",
};

export async function getDataSet<T>(url: keyof typeof urls): Promise<T[]> {
    const res = await fetch(urls[url]);
    return res.json();
}

export async function getData<T>(
    url: keyof typeof urls,
    params: (value: T) => unknown
): Promise<T> {
    const res = await fetch(urls[url]);
    const data = await res.json();
    return data.find(params);
}

export async function getUmaEvents(
    type: EventTypes,
    port?: number
): Promise<Events[]> {
    let url: string = `https://api.irminsul.gg/v2/uma/events-${type}.json`;
    if (port) {
        // URL for localhost development
        url = `http://localhost:${port}/events-${type}`;
    }
    const res = await fetch(url);
    return res.json();
}
