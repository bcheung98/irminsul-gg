// Component imports
import * as og from "@/og";

// Helper imports
import { getData } from "@/api";
import { formatHref } from "@/utils";

// Type imports
import { ImageResponse } from "takumi-js/response";
import { EndfieldCharacter } from "@/types/endfield";

export const alt = "IRMINSUL.GG";
export const size = og.size;
export const contentType = og.contentType;

interface Props {
    params: Promise<{ operator: string }>;
}

export default async function Image({ params }: Props) {
    const { operator } = await params;
    const data = await getData<EndfieldCharacter>(
        "endfield/operators",
        (d) => formatHref(d.url) === formatHref(operator),
    );

    return new ImageResponse(
        <og.Character
            tag="endfield/operators"
            stats={data.stats}
            attributes={data}
            materials={data.materials}
        />,
        { ...size, fonts: og.fonts },
    );
}
