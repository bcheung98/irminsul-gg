// Component imports
import * as og from "@/og";

// Helper imports
import { getData } from "@/api";
import { formatHref } from "@/utils";

// Type imports
import { ImageResponse } from "takumi-js/response";
import { NTEWeapon } from "@/types/nte";

export const alt = "IRMINSUL.GG";
export const size = og.size;
export const contentType = og.contentType;

interface Props {
    params: Promise<{ arc: string }>;
}

export default async function Image({ params }: Props) {
    const { arc } = await params;
    const data = await getData<NTEWeapon>(
        "nte/arcs",
        (d) => formatHref(d.url) === formatHref(arc),
    );

    return new ImageResponse(
        <og.Weapon
            tag="nte/arcs"
            stats={data.stats}
            attributes={data}
            materials={data.materials}
        />,
        { ...size, fonts: og.fonts },
    );
}
