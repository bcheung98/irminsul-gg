// Component imports
import * as og from "@/og";

// Helper imports
import { getData } from "@/api";
import { formatHref } from "@/utils";

// Type imports
import { ImageResponse } from "takumi-js/response";
import { NTECharacter } from "@/types/nte";

export const alt = "IRMINSUL.GG";
export const size = og.size;
export const contentType = og.contentType;

interface Props {
    params: Promise<{ esper: string }>;
}

export default async function Image({ params }: Props) {
    const { esper } = await params;
    const data = await getData<NTECharacter>(
        "nte/espers",
        (d) => formatHref(d.url) === formatHref(esper),
    );

    return new ImageResponse(
        <og.Character
            tag="nte/espers"
            stats={data.stats}
            attributes={data}
            materials={data.materials}
        />,
        { ...size, fonts: og.fonts },
    );
}
