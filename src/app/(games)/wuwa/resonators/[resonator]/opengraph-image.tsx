// Component imports
import * as og from "@/og";

// Helper imports
import { getData } from "@/api";
import { formatHref } from "@/utils";

// Type imports
import { ImageResponse } from "takumi-js/response";
import { WuWaCharacter } from "@/types/wuwa";

export const alt = "IRMINSUL.GG";
export const size = og.size;
export const contentType = og.contentType;

interface Props {
    params: Promise<{ resonator: string }>;
}

export default async function Image({ params }: Props) {
    const { resonator } = await params;
    const data = await getData<WuWaCharacter>(
        "wuwa/resonators",
        (d) => formatHref(d.url) === formatHref(resonator),
    );

    return new ImageResponse(
        <og.Character
            tag="wuwa/resonators"
            stats={data.stats}
            attributes={data}
            materials={data.materials}
        />,
        { ...size, fonts: og.fonts },
    );
}
