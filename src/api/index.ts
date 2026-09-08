import { urls } from "@/api/urls";
import { PopularPagesResponse } from "@/types";
import { Events, EventTypes } from "@/types/uma/event";

export async function getDataSet<T>(url: keyof typeof urls): Promise<T[]> {
    const res = await fetch(urls[url], { cache: "no-store" });
    if (!res.ok) {
        throw new Error(`Failed to fetch ${urls[url]}`);
    }
    return res.json();
}

export async function getData<T>(
    url: keyof typeof urls,
    params: (value: T) => boolean,
): Promise<T> {
    const res = await fetch(urls[url], { cache: "no-store" });
    if (!res.ok) {
        throw new Error(`Failed to fetch ${urls[url]}`);
    }
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
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    return res.json();
}

export async function getPopularPages(): Promise<PopularPagesResponse> {
    const res = await fetch(
        "https://api.irminsul.gg/v2/_analytics/popular-pages.json",
    );
    if (!res.ok) {
        throw new Error("Failed to fetch popular page data");
    }
    return res.json();
}

export async function getSitemapXML(): Promise<string> {
    const res = await fetch("https://irminsul.gg/sitemap.xml");
    if (!res.ok) {
        throw new Error("Failed to fetch sitemap XML data");
    }
    return res.text();
}

export async function getAppDetails(url: string): Promise<any> {
    let res: Response;
    try {
        res = await fetch(url, {
            cache: "no-store",
        });
    } catch {
        throw new Error("Unable to connect to the data server");
    }
    if (!res.ok) {
        const message = url.includes("/app-details")
            ? "Build: Failed to fetch app details"
            : "Data: Failed to fetch JSON manifest";
        throw new Error(`${message} (${res.status})`);
    }
    return res.json();
}

export { urls };
