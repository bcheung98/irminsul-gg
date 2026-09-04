interface RGB {
    r: number;
    g: number;
    b: number;
    a?: number;
}

interface HSL {
    h: number;
    s: number;
    l: number;
}

export function parseColor(color: string): RGB | null {
    const n = color.length;

    // rgb(...) / rgba(...)
    if (n > 9 && color.startsWith("rgb")) {
        const parts = color.split(",");

        if (parts.length < 3 || parts.length > 4) {
            return null;
        }

        const r = parseInt(parts[0].slice(parts[0].indexOf("(") + 1));
        const g = parseInt(parts[1]);
        const b = parseInt(parts[2]);
        const a = parts[3] !== undefined ? parseFloat(parts[3]) : -1;

        return { r, g, b, a };
    }

    // Hex colors
    if (color.startsWith("#")) {
        let hex = color;

        // #RGB / #RGBA → #RRGGBB / #RRGGBBAA
        if (n === 4 || n === 5) {
            hex =
                "#" +
                hex[1] +
                hex[1] +
                hex[2] +
                hex[2] +
                hex[3] +
                hex[3] +
                (n === 5 ? hex[4] + hex[4] : "");
        }

        if (hex.length !== 7 && hex.length !== 9) {
            return null;
        }

        if (!/^#[0-9a-fA-F]+$/.test(hex)) {
            return null;
        }

        const value = parseInt(hex.slice(1), 16);

        if (hex.length === 9) {
            return {
                r: (value >> 24) & 255,
                g: (value >> 16) & 255,
                b: (value >> 8) & 255,
                a: Math.round((value & 255) / 2.55) / 100,
            };
        }

        return {
            r: (value >> 16) & 255,
            g: (value >> 8) & 255,
            b: value & 255,
            a: -1,
        };
    }

    return null;
}

export function adjustColor(color: string, amount: number): string | null {
    if (amount < -1 || amount > 1) {
        return null;
    }

    let hex = color;

    // Convert shorthand hex (#RGB) to #RRGGBB
    if (/^#[0-9a-fA-F]{3}$/.test(hex)) {
        hex = hex.replace(/^#(.)(.)(.)$/, "#$1$1$2$2$3$3");
    }

    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) {
        return null;
    }

    const rgb: RGB = {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16),
    };

    if (amount < 0) {
        // Darken
        const factor = 1 + amount;

        rgb.r = Math.round(rgb.r * factor);
        rgb.g = Math.round(rgb.g * factor);
        rgb.b = Math.round(rgb.b * factor);
    } else {
        // Lighten
        rgb.r = Math.round(rgb.r + (255 - rgb.r) * amount);
        rgb.g = Math.round(rgb.g + (255 - rgb.g) * amount);
        rgb.b = Math.round(rgb.b + (255 - rgb.b) * amount);
    }

    return (
        "#" +
        rgb.r.toString(16).padStart(2, "0") +
        rgb.g.toString(16).padStart(2, "0") +
        rgb.b.toString(16).padStart(2, "0")
    );
}

export function hexToRGB(hex: string) {
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

export function rgbToHSL({ r, g, b }: RGB): HSL {
    ((r /= 255), (g /= 255), (b /= 255));

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
