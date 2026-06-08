import { games } from "@/data/games";
import { categories, categoryImgURLs } from "@/data/categories";
import { rarityMap as zzzRarityMap } from "@/data/zzz/common";
import { rarityMap as umaRarityMap } from "@/data/uma/common";
import { AttributeData, Game } from "@/types";
import { Metadata } from "next";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";

interface MetadataOverrides {
    title?: Metadata["title"];
    description?: string;
    siteName?: string;
    twitter?: TwitterOverrides;
}

type TwitterOverrides = Twitter & {
    card?: "summary" | "summary_large_image" | "player" | "app" | undefined;
};

export function getMetadata({
    game,
    tag,
    attributes,
    overrides,
}: {
    game?: Game;
    tag?: string;
    attributes?: AttributeData;
    overrides?: MetadataOverrides;
}): Metadata {
    let title = {
        default: "IRMINSUL.GG - Gacha Game Database and Tools",
        template: "%s - IRMINSUL.GG",
    };
    let description =
        "A comprehensive database and collection of tools for gacha games.";

    let siteName = `IRMINSUL.GG`;
    let icon = "https://assets.irminsul.gg/v2/_common/logo/logo_red.png";

    if (game) {
        const gameData = games[game];
        title = {
            default: gameData.name,
            template: `%s - ${gameData.name} - IRMINSUL.GG`,
        };
        description = `${gameData.name} Database and Tools`;
        siteName = `${gameData.name} - IRMINSUL.GG`;
        if (tag) {
            title.default = categories[`${game}/${tag}`];
            description = `A detailed list of all ${gameData.name} ${
                categories[`${game}/${tag}`]
            }`;
            if (attributes) {
                title.default = attributes.displayName || attributes.name || "";
                if (`${game}/${tag}` === "uma/characters") {
                    title.default = `${attributes.name} (${
                        attributes.outfit || "Original"
                    })`;
                }
                if (`${game}/${tag}` === "uma/supports") {
                    title.default = `${attributes.name} (${
                        umaRarityMap[attributes.rarity || 3]
                    } ${attributes.specialty})`;
                }
                description =
                    attributes.description?.replace("<br />", "\n") ||
                    `${gameData.name} Database and Tools`;
                if (`${game}/${tag}` in categoryImgURLs) {
                    icon = `https://assets.irminsul.gg/v2/${categoryImgURLs[
                        `${game}/${tag}`
                    ](attributes.id, attributes.name)}.png`;
                    siteName = getSitename({
                        game,
                        tag,
                        attributes,
                    });
                }
            }
        }
    }
    const images = [
        {
            url: icon,
            width: 128,
            height: 128,
            alt: title.default,
        },
    ];
    return {
        title: overrides?.title || title,
        description: overrides?.description || description,
        referrer: "origin-when-cross-origin",
        openGraph: {
            title: overrides?.title || title,
            description: overrides?.description || description,
            siteName: overrides?.siteName || siteName,
            images,
            type: "website",
        },
        twitter: {
            card: overrides?.twitter?.card || "summary",
            title: overrides?.twitter?.title || overrides?.title || title,
            description:
                overrides?.twitter?.description ||
                overrides?.description ||
                description,
            images:
                overrides?.twitter?.images || images.map((image) => image.url),
        },
        robots:
            tag === "tcg"
                ? {
                      index: false,
                      googleBot: {
                          index: false,
                      },
                  }
                : "index, follow",
    };
}

function getSitename({
    game,
    attributes,
}: {
    game: Game;
    tag: string;
    attributes: AttributeData;
}) {
    let res: string | undefined;
    switch (game) {
        case "genshin":
        case "hsr":
        case "wuwa":
        case "nte":
            if (attributes.weaponType) {
                if (attributes.element) {
                    res = `${attributes.displayName || attributes.name} (${
                        attributes.rarity
                    }★) - ${attributes.element} | ${attributes.weaponType}`;
                } else {
                    res = `${attributes.displayName || attributes.name} (${
                        attributes.rarity
                    }★) - ${attributes.weaponType}`;
                }
            }
            break;
        case "zzz":
            if (attributes.weaponType) {
                if (attributes.element) {
                    let element = attributes.element;
                    if (attributes.subElement) element = attributes.subElement;
                    res = `${attributes.name} (${
                        zzzRarityMap[attributes.rarity || 4]
                    }-Rank) - ${element} | ${attributes.weaponType}`;
                } else {
                    res = `${attributes.name} (${
                        zzzRarityMap[attributes.rarity || 3]
                    }-Rank) - ${attributes.weaponType}`;
                }
            }
            break;
        case "uma":
            res = attributes.title;
            break;
        case "endfield":
            if (attributes.specialty) {
                res = `${attributes.displayName || attributes.name} (${
                    attributes.rarity
                }★) - ${attributes.element} | ${attributes.specialty} |${attributes.weaponType}`;
            } else {
                res = `${attributes.displayName || attributes.name} (${
                    attributes.rarity
                }★) - ${attributes.weaponType}`;
            }
            break;
    }
    return res || "IRMINSUL.GG";
}

export const plannerMetaData = {
    title: "Ascension Planner",
    description: "Tool for calculating level-up costs",
};

export const bannerArchiveMetaData = (game: Game) => ({
    title: "Banner Archive",
    description: `A list of all ${games[game].name} Banners`,
});
