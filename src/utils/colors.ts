export interface RGB {
    r: number;
    g: number;
    b: number;
    a?: number;
}

export interface HSL {
    h: number;
    s: number;
    l: number;
    a?: number;
}

export type ColorFormat = "rgb" | "hex";

export default class Color {
    private readonly _rgb: RGB;
    private readonly _format: ColorFormat;

    constructor(color: string | RGB, format?: ColorFormat) {
        if (typeof color === "string") {
            const rgb = parseColor(color);

            if (!rgb) {
                throw new Error(`Invalid color: ${color}`);
            }

            this._rgb = rgb;
            this._format = color.startsWith("#") ? "hex" : "rgb";
        } else {
            this._rgb = color;
            this._format = format ?? "rgb";
        }
    }

    /** Returns the red channel of the color. */
    get r(): number {
        return this._rgb.r;
    }

    /** Returns the green channel of the color. */
    get g(): number {
        return this._rgb.g;
    }

    /** Returns the blue channel of the color. */
    get b(): number {
        return this._rgb.b;
    }

    /** Returns the alpha channel of the color, if present. */
    get a(): number | undefined {
        return this._rgb.a;
    }

    /** Returns the color as an RGB string. */
    get rgb(): string {
        const { r, g, b, a } = this._rgb;
        return a !== undefined
            ? `rgba(${r}, ${g}, ${b}, ${a})`
            : `rgb(${r}, ${g}, ${b})`;
    }

    /** Returns the color as an RGB object. */
    toRGBObject(): RGB {
        return this._rgb;
    }

    /** Returns the color as a hex string. */
    get hex(): string {
        const { r, g, b, a } = this._rgb;

        const hex =
            r.toString(16).padStart(2, "0") +
            g.toString(16).padStart(2, "0") +
            b.toString(16).padStart(2, "0");

        if (a !== undefined) {
            const alpha = Math.round(a * 255)
                .toString(16)
                .padStart(2, "0");

            return `#${hex}${alpha}`;
        }

        return `#${hex}`;
    }

    /** Returns the color as an HSL string. */
    get hsl(): string {
        const { h, s, l, a } = this.toHSLObject();

        return a !== undefined
            ? `hsla(${h}, ${s}%, ${l}%, ${a})`
            : `hsl(${h}, ${s}%, ${l}%)`;
    }

    /** Returns the color as an HSL object. */
    toHSLObject(): HSL {
        return this.parseHSL(this._rgb);
    }

    /** Returns the color as a string. */
    toString(): string {
        return this._format === "hex" ? this.hex : this.rgb;
    }

    /** Lightens or darkens the color. Returns a new `Color` object. */
    adjust(amount: number): Color {
        if (amount < -1 || amount > 1) {
            console.warn("Color adjustment value must be between -1 and 1.");
            return this;
        }

        const target = amount < 0 ? 0 : 255;
        const factor = Math.abs(amount);

        return new Color(
            {
                r: Math.round(this.r + (target - this.r) * factor),
                g: Math.round(this.g + (target - this.g) * factor),
                b: Math.round(this.b + (target - this.b) * factor),
                ...(this.a !== undefined && { a: this.a }),
            },
            this._format,
        );
    }

    /** Lightens the color. Returns a new `Color` object. */
    lighten(amount: number): Color {
        return this.adjust(Math.abs(amount));
    }

    /** Darkens the color. Returns a new `Color` object. */
    darken(amount: number): Color {
        return this.adjust(-Math.abs(amount));
    }

    /** Sets the alpha channel of the color. Returns a new `Color` object. */
    alpha(alpha: number): Color {
        if (alpha < 0 || alpha > 1) {
            console.warn("Alpha value must be between 0 and 1.");
            return this;
        }

        return new Color(
            {
                r: this.r,
                g: this.g,
                b: this.b,
                a: alpha,
            },
            this._format,
        );
    }

    /** Takes an RGB object and converts it into an HSL object. */
    private parseHSL({ r, g, b, a }: RGB): HSL {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d = max - min;

        let h = 0;
        let s = 0;
        const l = (max + min) / 2;

        if (d !== 0) {
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

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100),
            ...(a !== undefined && { a }),
        };
    }
}

function parseColor(color: string): RGB | null {
    const value = color.trim();

    // rgb(...) / rgba(...)
    const rgbMatch = value.match(
        /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/,
    );

    if (rgbMatch) {
        const r = Math.min(Number(rgbMatch[1]), 255);
        const g = Math.min(Number(rgbMatch[2]), 255);
        const b = Math.min(Number(rgbMatch[3]), 255);
        const a = rgbMatch[4] !== undefined ? Number(rgbMatch[4]) : undefined;

        if (
            r > 255 ||
            g > 255 ||
            b > 255 ||
            (a !== undefined && (a < 0 || a > 1))
        ) {
            console.warn(`Invalid color ${color}`);
            return null;
        }

        return { r, g, b, ...(a !== undefined && { a }) };
    }

    // #RGB / #RGBA / #RRGGBB / #RRGGBBAA
    const hexMatch = value.match(
        /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
    );

    if (!hexMatch) {
        console.warn(`Invalid color ${color}`);
        return null;
    }

    let hex = hexMatch[1];

    if (hex.length === 3 || hex.length === 4) {
        hex = [...hex].map((char) => char + char).join("");
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    if (hex.length === 8) {
        const a =
            Math.round((parseInt(hex.slice(6, 8), 16) / 255) * 1000) / 1000;

        return {
            r,
            g,
            b,
            a,
        };
    }

    return { r, g, b };
}
