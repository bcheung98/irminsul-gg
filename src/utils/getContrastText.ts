import { getContrastRatio, hslToRgb } from "@mui/material/styles";
import { hexToRGB, rgbToHSL } from "./colors";

export function getContrastText(
    textColor: string,
    backgroundColor: string,
    threshold = 7,
) {
    const ratio = getContrastRatio(textColor, backgroundColor);
    if (ratio > threshold) {
        return textColor;
    } else {
        let { h, s } = rgbToHSL(hexToRGB(textColor));
        for (let i = 100; i > 0; i--) {
            let res = getContrastRatio(
                hslToRgb(`hsl(${h}, ${s}, ${i})`),
                backgroundColor,
            );
            if (res > threshold) {
                return hslToRgb(`hsl(${h}, ${s}, ${i})`);
            }
        }
        return textColor;
    }
}
