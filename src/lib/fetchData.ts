export type LoadingStatus = "idle" | "pending" | "success" | "error";

export const urls: { [key: string]: string } = {
    "genshin/characters": "https://api.irminsul.gg/genshin/characters.json",
    "genshin/weapons": "https://api.irminsul.gg/genshin/weapons.json",
    "genshin/artifacts": "https://api.irminsul.gg/genshin/artifacts.json",
};

export async function getDataSet<T>(url: string): Promise<T[]> {
    const res = await fetch(urls[url]);
    return res.json();
}

export async function getData<T>(
    url: string,
    params: (value: T) => unknown
): Promise<T> {
    const res = await fetch(urls[url]);
    const data = await res.json();
    return data.find(params);
}
