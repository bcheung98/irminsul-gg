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

export function sortBy(
    ...args:
        | [a: string, b: string, reverse?: boolean]
        | [a: number, b: number, reverse?: boolean]
): number {
    let a: string | number;
    let b: string | number;
    if (args[2]) {
        a = args[0];
        b = args[1];
    } else {
        a = args[1];
        b = args[0];
    }
    if (typeof a === "string" && typeof b === "string") {
        return a.localeCompare(b);
    } else if (typeof a === "number" && typeof b === "number") {
        return a - b;
    } else {
        return 0;
    }
}

export function toTitleCase(str: string) {
    return str
        .split("_")
        .map((i) =>
            i.replace(
                /\w\S*/g,
                (text) =>
                    text.charAt(0).toUpperCase() +
                    text.substring(1).toLowerCase()
            )
        )
        .join("_");
}

export function countText({
    count = 1,
    single,
    multi,
    showCount = false,
}: {
    count?: number | number[];
    single: string;
    multi?: string | null;
    showCount?: boolean;
}) {
    let strCount = Array.isArray(count) ? count.join("–") : count.toString();
    multi = multi?.replace("$X", strCount);
    const res = `${Number(count) === 1 ? single : multi || `${single}s`}`;
    return showCount ? `${strCount} ${res}` : res;
}

export function pxToInt(num: string | number) {
    if (typeof num === "number") {
        return num;
    } else if (!num.endsWith("px")) {
        console.warn("Recieved non-pixel unit");
        return 0;
    } else {
        return Number(num.slice(0, -2));
    }
}
