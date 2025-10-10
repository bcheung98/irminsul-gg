import { getContrastRatio, hslToRgb } from "@mui/material/styles";

type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };

export function getContrastText(
    textColor: string,
    backgroundColor: string,
    threshold = 7
) {
    const ratio = getContrastRatio(textColor, backgroundColor);
    if (ratio > threshold) {
        return textColor;
    } else {
        let { h, s } = rgbToHSL(hexToRGB(textColor));
        for (let i = 100; i > 0; i--) {
            let res = getContrastRatio(
                hslToRgb(`hsl(${h}, ${s}, ${i})`),
                backgroundColor
            );
            if (res > threshold) {
                return hslToRgb(`hsl(${h}, ${s}, ${i})`);
            }
        }
        return textColor;
    }
}

function hexToRGB(hex: string) {
    const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let result: RGB;
    if (regex) {
        result = {
            r: parseInt(regex[1], 16),
            g: parseInt(regex[2], 16),
            b: parseInt(regex[3], 16),
        };
    } else {
        hex = hex
            .replace("rgb", "")
            .replace("(", "")
            .replace(")", "")
            .replace(" ", "");
        const [r, g, b] = hex.split(",").map((i) => parseInt(i));
        result = { r, g, b };
    }
    return result;
}

function rgbToHSL({ r, g, b }: RGB): HSL {
    (r /= 255), (g /= 255), (b /= 255);

    let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h = (max + min) / 2;
    let s = (max + min) / 2;
    let l = (max + min) / 2;

    if (max == min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h, s, l };
}
