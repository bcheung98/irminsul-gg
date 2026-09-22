import { splitJoin } from "@/utils";

const ASSET_PREFIX = "https://assets.irminsul.gg/v2";
const DEFAULT_FALLBACK = "_common/images/Unknown";

export const DEFAULT_FALLBACK_URL = resolveImageUrl(DEFAULT_FALLBACK, "png");

// Hides browser default missing image icon
export const EMPTY_IMAGE =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'/%3E";

export function toCssLength(value: string | number | undefined): string {
    return typeof value === "number" ? `${value}px` : (value ?? "auto");
}

export function resolveImageUrl(src: string, format = "png"): string {
    if (/^https?:\/\//i.test(src)) {
        return src;
    }

    const path = splitJoin(src);

    if (/\.(png|jpe?g|webp|avif|gif|svg)$/i.test(path)) {
        return `${ASSET_PREFIX}/${path}`;
    }

    return `${ASSET_PREFIX}/${path}.${format}`;
}

export function resolveFallbackImages(
    imageUrl: string,
    fallbackSrc?: string | string[],
): string[] {
    const fallbacks = Array.isArray(fallbackSrc)
        ? fallbackSrc
        : fallbackSrc
          ? [fallbackSrc]
          : [];

    return [
        ...new Set(
            fallbacks
                .map((src) => resolveImageUrl(src, "png"))
                .filter(
                    (url) => ![imageUrl, DEFAULT_FALLBACK_URL].includes(url),
                ),
        ),
        ...(imageUrl !== DEFAULT_FALLBACK_URL ? [DEFAULT_FALLBACK_URL] : []),
    ];
}
