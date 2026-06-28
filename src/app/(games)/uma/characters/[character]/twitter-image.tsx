// Component imports
import * as og from "@/og";

// Helper imports
import { getData } from "@/api";
import { formatHref } from "@/utils";

// Type imports
import { ImageResponse } from "takumi-js/response";
import { UmaCharacter } from "@/types/uma";

export const alt = "IRMINSUL.GG";
export const size = og.size;
export const contentType = og.contentType;

interface Props {
    params: Promise<{ character: string }>;
}

export default async function Image({ params }: Props) {
    const { character } = await params;
    const data = await getData<UmaCharacter>(
        "uma/characters",
        (d) => formatHref(d.url) === formatHref(character),
    );

    return new ImageResponse(
        <og.UmaCharacter
            tag="uma/characters"
            attributes={data}
            stats={data.stats}
            aptitude={data.aptitude}
        />,
        { ...size, fonts: og.fonts },
    );
}
