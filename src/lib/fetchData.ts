export const urls = {
    "genshin/characters": "https://api.irminsul.gg/v2/genshin/characters.json",
    "genshin/weapons": "https://api.irminsul.gg/v2/genshin/weapons.json",
    "genshin/artifacts": "https://api.irminsul.gg/v2/genshin/artifacts.json",
    "genshin/banner-characters":
        "https://api.irminsul.gg/v2/genshin/banner-characters.json",
    "genshin/banner-weapons":
        "https://api.irminsul.gg/v2/genshin/banner-weapons.json",
    "genshin/banner-chronicled":
        "https://api.irminsul.gg/v2/genshin/banner-chronicled.json",
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
