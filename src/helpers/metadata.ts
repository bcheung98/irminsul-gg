import { range } from "@/utils";
import { games } from "@/data/games";
import { categories, categoryImgURLs } from "@/data/categories";
import { rarityMap as zzzRarityMap } from "@/data/zzz/common";
import { rarityMap as umaRarityMap } from "@/data/uma/common";
import { AttributeData, Game, GameData } from "@/types";
import { Metadata } from "next";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";

type TwitterCard = "summary" | "summary_large_image" | "player" | "app";
type TwitterOverrides = Twitter & {
    card?: TwitterCard;
};
type TwitterImage = Twitter["images"];

interface MetadataOverrides {
    title?: Metadata["title"];
    description?: string;
    siteName?: string;
    twitter?: TwitterOverrides;
}

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

    let siteName = `IRMINSUL.GG - Gacha Game Database and Tools`;
    let icon = "https://assets.irminsul.gg/docs/card.png";
    let width = 1200;
    let height = 630;
    let twitterImgType: TwitterCard = "summary_large_image";

    if (game) {
        const gameData = games[game];
        title = {
            default: `${gameData.name} Database and Tools`,
            template: `%s - ${gameData.name} - IRMINSUL.GG`,
        };
        description = `A comprehensive database and collection of tools for ${gameData.name}. View characters, track banner history, plan builds, and more.`;
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
                if (`${game}/${tag}` in categoryImgURLs) {
                    if (game !== "uma" && attributes.description) {
                        description = `${attributes.description}`;
                    }
                }
            }
        }
    }

    const ogTitle: Metadata["title"] = {
        default: title.default
            .replace(" - IRMINSUL.GG", "")
            .replace(" - Gacha Game Database and Tools", ""),
        template: title.template
            .replace(" - IRMINSUL.GG", "")
            .replace(" - Gacha Game Database and Tools", ""),
    };

    description = (overrides?.description ?? description).replaceAll(
        "<br />",
        "\n",
    );

    let images: TwitterImage = overrides?.twitter?.images ?? [
        {
            url: icon,
            width,
            height,
            alt: title.default,
        },
    ];

    if (tag && ["equipment", "bangboos"].includes(tag) && attributes) {
        twitterImgType = "summary";
        images = [
            {
                url: `https://assets.irminsul.gg/v2/${categoryImgURLs[
                    `${game}/${tag}`
                ](attributes.id, attributes.name)}.png`,
                width: 256,
                height: 256,
                alt: attributes.displayName,
            },
        ];
    }

    const metadata: Metadata = {
        metadataBase: new URL("https://irminsul.gg/"),
        title: overrides?.title ?? title,
        description,
        referrer: "origin-when-cross-origin",
        openGraph: {
            title: overrides?.title ?? ogTitle,
            description,
            siteName: overrides?.siteName ?? siteName,
            type: "website",
        },
        twitter: {
            card: overrides?.twitter?.card ?? twitterImgType,
            title: overrides?.twitter?.title ?? overrides?.title ?? ogTitle,
            description: (
                overrides?.twitter?.description ??
                overrides?.description ??
                description
            ).replaceAll("<br />", "\n"),
        },
        robots: "index, follow",
    };

    if (!attributes || ["equipment", "bangboos"].includes(tag || "")) {
        metadata.openGraph!.images = images;
        metadata.twitter!.images = images;
    }

    return metadata;
}

function getDescription({
    game,
    attributes,
}: {
    game: Game;
    tag: string;
    attributes: AttributeData;
}) {
    let res = "";
    switch (game) {
        case "genshin":
        case "hsr":
        case "wuwa":
        case "nte":
            if (attributes.weaponType) {
                if (attributes.element) {
                    res = `Rarity: ${rarity(attributes.rarity)}\n${attributeNames[game].element}: ${attributes.element}\n${attributeNames[game].weaponType}: ${attributes.weaponType}\n\n`;
                } else {
                    res = `Rarity: ${rarity(attributes.rarity)}\n${attributeNames[game].weaponType}: ${attributes.weaponType}\n\n`;
                }
            }
            break;
        case "zzz":
            if (attributes.weaponType) {
                if (attributes.element) {
                    let element = attributes.element;
                    if (attributes.subElement) element = attributes.subElement;
                    res = `Rank: ${zzzRarityMap[attributes.rarity || 4]}\n${attributeNames[game].element}: ${element}\n${attributeNames[game].weaponType}: ${attributes.weaponType}\n\n`;
                } else {
                    res = `Rank: ${zzzRarityMap[attributes.rarity || 3]}\n${attributeNames[game].weaponType}: ${attributes.weaponType}\n\n`;
                }
            } else {
                res = `Rank: ${zzzRarityMap[attributes.rarity || 4]}\n\n`;
            }
            break;
        case "uma":
            res = `[${attributes.title}] ${attributes.name}`;
            break;
        case "endfield":
            if (attributes.specialty) {
                res = `Rarity: ${rarity(attributes.rarity)}\n${attributeNames[game].element}: ${attributes.element}\nSpecialty: ${attributes.specialty}\n${attributeNames[game].weaponType}: ${attributes.weaponType}\n\n`;
            } else {
                res = `Rarity: ${rarity(attributes.rarity)}\n${attributeNames[game].weaponType}: ${attributes.weaponType}\n\n`;
            }
            break;
        default:
            res =
                "A comprehensive database and collection of tools for gacha games.";
    }
    return res;
}

export const plannerMetaData = {
    title: "Ascension Planner",
    description:
        "Tool for calculating level-up costs of characters and weapons",
};

export const bannerArchiveMetaData = (game: Game) => ({
    title: "Banner Archive",
    description: `A list of all ${games[game].name} Banners`,
});

const rarity = (r = 0) =>
    range(r || 0)
        .map((_) => "★")
        .join("");

const attributeNames: GameData<Record<string, string>> = {
    genshin: { element: "Element", weaponType: "Weapon Type" },
    hsr: { element: "Combat Type", weaponType: "Path" },
    wuwa: { element: "Attribute", weaponType: "Weapon Type" },
    zzz: { element: "Attribute", weaponType: "Specialty" },
    uma: { element: "", weaponType: "" },
    endfield: { element: "Element", weaponType: "Weapon Type" },
    nte: { element: "Esper Type", weaponType: "Arc Type" },
};
