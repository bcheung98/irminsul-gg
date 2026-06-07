import { urls } from "@/api/urls";
import { Events, EventTypes } from "@/types/uma/event";

export async function getDataSet<T>(url: keyof typeof urls): Promise<T[]> {
    const res = await fetch(urls[url], { cache: "no-store" });
    return res.json();
}

export async function getData<T>(
    url: keyof typeof urls,
    params: (value: T) => boolean,
): Promise<T> {
    const res = await fetch(urls[url], { cache: "no-store" });
    const data = await res.json();
    return data.find(params);
}

export async function getUmaEvents(
    type: EventTypes,
    port?: number,
): Promise<Events[]> {
    let url: string = `https://api.irminsul.gg/v2/uma/events-${type}.json`;
    if (port) {
        // URL for localhost development
        url = `http://localhost:${port}/events-${type}`;
    }
    const res = await fetch(url, { cache: "no-store" });
    return res.json();
}

export { urls };
