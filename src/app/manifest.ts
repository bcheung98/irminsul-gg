import { icons, shortcuts } from "@/helpers/manifest";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "IRMINSUL.GG",
        short_name: "Irminsul.GG",
        description:
            "Irminsul.GG - A gacha game database and companion site.",
        start_url: "/",
        display: "standalone",
        background_color: "rgb(40, 40, 40)",
        theme_color: "rgb(8, 8, 8)",
        icons,
        shortcuts,
        screenshots: [
            {
                src: "https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/preview.png",
                sizes: "1920x1080",
                type: "image/png",
                form_factor: "wide",
            },
        ],
    };
}
