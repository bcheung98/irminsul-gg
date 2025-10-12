export function useTextColor(colors: Record<string, any>) {
    return (...keys: (string | undefined)[]): any => {
        const color = colors[(keys[0] || "primary").toLocaleLowerCase()];
        return typeof color === "object"
            ? useTextColor(color)(keys[1], ...keys.slice(2))
            : color || colors.primary;
    };
}
