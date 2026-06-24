import * as og from "@/og";
import { ImageResponse } from "takumi-js/response";
import { googleFonts } from "takumi-js/helpers";

export const alt = "IRMINSUL.GG";
export const size = og.size;
export const contentType = og.contentType;

export default async function Image() {
    return new ImageResponse(<og.Default />, {
        ...size,
        fonts: await googleFonts({
            families: ["Rowdies"],
        }),
    });
}
