import * as og from "@/og";
import { ImageResponse } from "takumi-js/response";

export const alt = "IRMINSUL.GG";
export const size = og.size;
export const contentType = og.contentType;

export default async function Image() {
    return new ImageResponse(<og.Default />, {
        ...size,
    });
}
