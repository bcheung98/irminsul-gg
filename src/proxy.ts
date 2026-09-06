import { urls } from "@/api";
import { NextRequest, NextResponse } from "next/server";

const LEGACY_GAMES = new Set(["genshin", "hsr", "wuwa", "zzz"]);

export const config = {
    matcher: [
        "/genshin/:path*",
        "/hsr/:path*",
        "/wuwa/:path*",
        "/zzz/:path*",
        "/uma/:path*",
        "/endfield/:path*",
        "/nte/:path*",
    ],
};

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const parts = pathname.split("/").filter(Boolean);

    const game = parts[0];
    const slug = parts.at(-1);

    if (!slug) {
        return NextResponse.next();
    }

    const route = parts.slice(0, -1).join("/");
    const endpoint = urls[route as keyof typeof urls];

    if (!endpoint) {
        return NextResponse.next();
    }

    // Current ID-based URL
    if (/^\d+$/.test(slug)) {
        return NextResponse.next();
    }

    // Name-ID URL used across all games
    const idMatch = slug.match(/-(\d+)$/);
    if (idMatch) {
        const url = request.nextUrl.clone();
        url.pathname = `/${route}/${idMatch[1]}`;

        return NextResponse.redirect(url, 308);
    }

    // Only these games had the old name-only URL format
    if (!LEGACY_GAMES.has(game)) {
        return NextResponse.next();
    }

    // Potential legacy name-based URL
    const item = await findLegacyItem(endpoint, slug);

    if (!item) {
        return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = `/${route}/${item.id}`;

    return NextResponse.redirect(url, 308);
}

interface LegacyItem {
    id: number;
    name: string;
}

async function findLegacyItem(
    endpoint: string,
    slug: string,
): Promise<LegacyItem | undefined> {
    const response = await fetch(endpoint);

    if (!response.ok) {
        return undefined;
    }

    const items: LegacyItem[] = await response.json();

    return items.find((item) => getLegacySlug(item.name) === slug);
}

function getLegacySlug(name: string) {
    return name.replaceAll(" ", "_").toLowerCase();
}
