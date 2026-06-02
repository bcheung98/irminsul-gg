import { games } from "@/data/games";
import { MetadataRoute } from "next";

export const icons: MetadataRoute.Manifest["icons"] = [
    {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
    },
    {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/x-icon",
    },
];
[32, 48, 72, 96, 128, 144, 192, 256, 512].forEach((size) =>
    icons.push(
        {
            src: `https://assets.irminsul.gg/v2/_common/icons/icon-${size}.png`,
            sizes: `${size}x${size}`,
            type: "image/png",
        },
        {
            src: `https://assets.irminsul.gg/v2/_common/icons-mask/icon-${size}.png`,
            sizes: `${size}x${size}`,
            type: "image/png",
            purpose: "maskable",
        },
    ),
);

export const shortcuts: MetadataRoute.Manifest["shortcuts"] = [
    {
        name: "Gacha Calendar",
        short_name: "Calendar",
        url: "/calendar",
        icons: [
            {
                src: "https://assets.irminsul.gg/v2/_common/icons/icon-96.png",
                sizes: "96x96",
                type: "image/png",
            },
        ],
    },
];
Object.values(games)
    .sort((a, b) => a.tag.localeCompare(b.tag))
    .forEach((game) => {
        shortcuts.push({
            name: game.name,
            short_name: game.shortName,
            url: `/${game.tag}`,
            icons: [
                {
                    src: `https://assets.irminsul.gg/v2/${game.tag}/_common/Icon-96.png`,
                    sizes: "96x96",
                    type: "image/png",
                },
            ],
        });
    });
