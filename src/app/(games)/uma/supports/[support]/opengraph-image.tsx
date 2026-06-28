// Component imports
import * as og from "@/og";

// Helper imports
import { getData } from "@/api";
import { formatHref } from "@/utils";

// Type imports
import { ImageResponse } from "takumi-js/response";
import { UmaSupport } from "@/types/uma";

export const alt = "IRMINSUL.GG";
export const size = og.size;
export const contentType = og.contentType;

interface Props {
    params: Promise<{ support: string }>;
}

export default async function Image({ params }: Props) {
    const { support } = await params;
    const data = await getData<UmaSupport>(
        "uma/supports",
        (d) => formatHref(d.url) === formatHref(support),
    );

    return new ImageResponse(
        <og.UmaSupport
            tag="uma/supports"
            attributes={data}
            perks={data.perks}
            supportEffects={data.supportEffects}
        />,
        { ...size, fonts: og.fonts },
    );
}
