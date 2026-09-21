import { getContrastRatio, hslToRgb } from "@mui/material/styles";
import Color from "./colors";

export function getContrastText(
    textColor: string,
    backgroundColor: string,
    threshold = 7,
) {
    if (getContrastRatio(textColor, backgroundColor) > threshold) {
        return textColor;
    }

    const { h, s, l } = new Color(textColor).toHSLObject();

    const whiteRatio = getContrastRatio("#fff", backgroundColor);
    const blackRatio = getContrastRatio("#000", backgroundColor);

    const direction = whiteRatio > blackRatio ? 1 : -1;

    let lightness = l + direction;

    while (lightness >= 0 && lightness <= 100) {
        const rgb = hslToRgb(`hsl(${h}, ${s}%, ${lightness}%)`);

        if (getContrastRatio(rgb, backgroundColor) > threshold) {
            return rgb;
        }

        lightness += direction;
    }

    return textColor;
}
