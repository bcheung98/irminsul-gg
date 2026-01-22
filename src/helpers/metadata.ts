import { games } from "@/data/games";
import { categories, categoryImgURLs } from "@/data/categories";
import { rarityMap as zzzRarityMap } from "@/data/zzz/common";
import { rarityMap as umaRarityMap } from "@/data/uma/common";
import { AttributeData, Game } from "@/types";
import { Metadata } from "next";

export function getMetadata({
    game,
    tag,
    attributes,
    overrides,
}: {
    game?: Game;
    tag?: string;
    attributes?: AttributeData;
    overrides?: {
        title?: Metadata["title"];
        description?: string;
        siteName?: string;
    };
}): Metadata {
    let title = {
        default: "Irminsul.GG",
        template: "%s - Irminsul.GG",
    };
    let description =
        "A database and companion website for various gacha games.";

    let siteName = `Irminsul.GG`;
    let icon = "https://assets.irminsul.gg/v2/_common/logo/logo_red.png";

    if (game) {
        const gameData = games[game];
        title = {
            default: gameData.name,
            template: `%s - ${gameData.name} - Irminsul.GG`,
        };
        description = `The ${gameData.name} branch of Irminsul.GG - a database and companion website for various gacha games.`;
        siteName = `${gameData.name} - Irminsul.GG`;
        if (tag) {
            title.default = categories[`${game}/${tag}`];
            description = `A list of all ${gameData.name} ${
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
                description = attributes.description || "";
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
            width: 96,
            height: 96,
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
            title: overrides?.title || title,
            images,
        },
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
    return res || "Irminsul.GG";
}

export const plannerMetaData = {
    title: "Ascension Planner",
    description: "Tool for calculating level-up costs",
};

export const bannerArchiveMetaData = (game: Game) => ({
    title: "Banner Archive",
    description: `A list of all ${games[game].name} Banners`,
});
