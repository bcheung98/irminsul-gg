// Component imports
import * as og from "@/og";

// Helper imports
import { getData } from "@/api";
import { formatHref } from "@/utils";

// Type imports
import { ImageResponse } from "takumi-js/response";
import { HSRWeapon } from "@/types/hsr";

export const alt = "IRMINSUL.GG";
export const size = og.size;
export const contentType = og.contentType;

interface Props {
    params: Promise<{ lightcone: string }>;
}

export default async function Image({ params }: Props) {
    const { lightcone } = await params;
    const data = await getData<HSRWeapon>(
        "hsr/lightcones",
        (d) => formatHref(d.url) === formatHref(lightcone),
    );

    return new ImageResponse(
        <og.Weapon
            tag="hsr/lightcones"
            stats={data.stats}
            attributes={data}
            materials={data.materials}
        />,
        { ...size, fonts: og.fonts },
    );
}
