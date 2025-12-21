import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Irminsul.GG",
        short_name: "Irminsul.GG",
        description:
            "Irminsul.GG - A database and companion website for various gacha games.",
        start_url: "/",
        display: "minimal-ui",
        background_color: "rgb(40, 40, 40)",
        theme_color: "rgb(8, 8, 8)",
        icons: [
            {
                src: "icon-72.png",
                sizes: "72x72",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "icon-128.png",
                sizes: "128x128",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "icon-144.png",
                sizes: "144x144",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "icon-192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "icon-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
        shortcuts: [
            {
                name: "Gacha Calendar",
                short_name: "Calendar",
                url: "/calendar",
            },
            {
                name: "Genshin Impact",
                short_name: "Genshin",
                url: "/genshin",
                icons: [
                    {
                        src: "https://assets.irminsul.gg/v2/genshin/_common/Icon.png",
                        sizes: "any",
                        type: "image/png",
                    },
                ],
            },
            {
                name: "Honkai: Star Rail",
                short_name: "HSR",
                url: "/hsr",
                icons: [
                    {
                        src: "https://assets.irminsul.gg/v2/hsr/_common/Icon.png",
                        sizes: "any",
                        type: "image/png",
                    },
                ],
            },
            {
                name: "Wuthering Waves",
                short_name: "WuWa",
                url: "/wuwa",
                icons: [
                    {
                        src: "https://assets.irminsul.gg/v2/wuwa/_common/Icon.png",
                        sizes: "any",
                        type: "image/png",
                    },
                ],
            },
            {
                name: "Zenless Zone Zero",
                short_name: "ZZZ",
                url: "/zzz",
                icons: [
                    {
                        src: "https://assets.irminsul.gg/v2/zzz/_common/Icon.png",
                        sizes: "any",
                        type: "image/png",
                    },
                ],
            },
            {
                name: "Umamusume",
                short_name: "Uma",
                url: "/uma",
                icons: [
                    {
                        src: "https://assets.irminsul.gg/v2/uma/_common/Icon.png",
                        sizes: "any",
                        type: "image/png",
                    },
                ],
            },
        ],
    };
}
