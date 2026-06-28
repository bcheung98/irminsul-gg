// Component imports
import * as og from "@/og";

// Helper imports
import { getData } from "@/api";
import { formatHref } from "@/utils";

// Type imports
import { ImageResponse } from "takumi-js/response";
import { ZZZWeapon } from "@/types/zzz";

export const alt = "IRMINSUL.GG";
export const size = og.size;
export const contentType = og.contentType;

interface Props {
    params: Promise<{ "w-engine": string }>;
}

export default async function Image({ params }: Props) {
    const { "w-engine": weapon } = await params;
    const data = await getData<ZZZWeapon>(
        "zzz/w-engines",
        (d) => formatHref(d.url) === formatHref(weapon),
    );

    return new ImageResponse(
        <og.Weapon
            tag="zzz/w-engines"
            stats={data.stats}
            attributes={data}
            materials={{}}
        />,
        { ...size, fonts: og.fonts },
    );
}
