// Component imports
import * as og from "@/og";

// Helper imports
import { getData } from "@/api";
import { formatHref } from "@/utils";

// Type imports
import { ImageResponse } from "takumi-js/response";
import { EndfieldWeapon } from "@/types/endfield";

export const alt = "IRMINSUL.GG";
export const size = og.size;
export const contentType = og.contentType;

interface Props {
    params: Promise<{ weapon: string }>;
}

export default async function Image({ params }: Props) {
    const { weapon } = await params;
    const data = await getData<EndfieldWeapon>(
        "endfield/weapons",
        (d) => formatHref(d.url) === formatHref(weapon),
    );

    return new ImageResponse(
        <og.Weapon
            tag="endfield/weapons"
            stats={data.stats}
            attributes={data}
            materials={data.materials}
        />,
        { ...size, fonts: og.fonts },
    );
}
