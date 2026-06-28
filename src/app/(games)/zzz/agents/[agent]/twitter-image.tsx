// Component imports
import * as og from "@/og";

// Helper imports
import { getData } from "@/api";
import { formatHref } from "@/utils";

// Type imports
import { ImageResponse } from "takumi-js/response";
import { ZZZCharacter } from "@/types/zzz";

export const alt = "IRMINSUL.GG";
export const size = og.size;
export const contentType = og.contentType;

interface Props {
    params: Promise<{ agent: string }>;
}

export default async function Image({ params }: Props) {
    const { agent } = await params;
    const data = await getData<ZZZCharacter>(
        "zzz/agents",
        (d) => formatHref(d.url) === formatHref(agent),
    );

    return new ImageResponse(
        <og.Character
            tag="zzz/agents"
            stats={data.stats}
            attributes={data}
            materials={data.materials}
        />,
        { ...size, fonts: og.fonts },
    );
}
