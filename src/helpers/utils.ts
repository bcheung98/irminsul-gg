import { Shade } from "types/theme";

export function range(len: number): number[];
export function range(start: number, stop: number, step?: number): number[];
export function range(a: number, b?: number, step = 1): number[] {
    let arr: number[] = [];
    if (b) {
        const start = Math.min(a, b);
        const stop = Math.max(a, b);
        arr = [...Array(stop - start + 1).keys()].map((i) => i * step + start);
        a > b && arr.reverse();
    } else {
        arr = [...Array(a).keys()].map((i) => i);
    }
    return arr;
}

export function objectKeys<T extends {}>(obj: T) {
    return Object.keys(obj) as Array<keyof T>;
}

export function combineStyles(
    style1: React.CSSProperties,
    style2: React.CSSProperties | undefined
) {
    return style2 ? { ...style1, ...style2 } : style1;
}

export function zoomImageOnHover({
    direction,
    id,
    baseScale = 1,
    zoom = 1.1,
    translate = "translate(0px, 0px)",
}: {
    direction: "enter" | "leave";
    id: string;
    baseScale?: number;
    zoom?: number;
    translate?: string;
}) {
    const image = document.getElementById(id);
    if (image !== null) {
        if (direction === "enter") {
            image.style.transition = "transform .2s";
            image.style.transform = `scale(${zoom}) ${translate}`;
        } else {
            image.style.transition = "transform .2s";
            image.style.transform = `scale(${baseScale}) ${translate}`;
        }
    }
}

export function isTBA(str: string) {
    return str === "TBA" || str === "To be announced";
}

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

export function getHoverColor(color: string, contrast = 20) {
    const [r, g, b] = color
        .replace(/[^\d,]/g, "")
        .split(",")
        .map((color) => Number(color));
    return `rgb(${r + contrast}, ${g + contrast}, ${b + contrast})`;
}
