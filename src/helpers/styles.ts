import { Shade } from "@/types/theme";

interface GetThemeBackgroundColorsProps {
    colors: Record<Shade, string>[];
    index: number;
    shade?: Shade;
}

export function getThemeBackgroundColors({
    colors,
    index,
    shade = "main",
}: GetThemeBackgroundColorsProps) {
    return colors[Math.min(index, colors.length - 1)][shade];
}
