// Component imports
import * as og from "@/og";

// Helper imports
import { getData } from "@/api";
import { formatHref } from "@/utils";

// Type imports
import { ImageResponse } from "takumi-js/response";
import { GenshinCharacter } from "@/types/genshin";

export const alt = "IRMINSUL.GG";
export const size = og.size;
export const contentType = og.contentType;

interface Props {
    params: Promise<{ character: string }>;
}

export default async function Image({ params }: Props) {
    const { character } = await params;
    const data = await getData<GenshinCharacter>(
        "genshin/characters",
        (d) => formatHref(d.url) === formatHref(character),
    );

    return new ImageResponse(
        <og.Character
            tag="genshin/characters"
            stats={data.stats}
            attributes={data}
            materials={data.materials}
        />,
        { ...size, fonts: og.fonts },
    );
}
