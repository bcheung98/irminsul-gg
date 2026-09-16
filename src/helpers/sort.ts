import { Game } from "@/types";
import sortGenshinItems from "./genshin/sortItems";
import sortHSRItems from "./hsr/sortItems";
import sortWuWaItems from "./wuwa/sortItems";
import sortZZZItems from "./zzz/sortItems";
import sortUmaItems from "./uma/sortItems";
import sortEndfieldItems from "./endfield/sortItems";
import sortNTEItems from "./nte/sortItems";

export interface SortProps<T extends Record<string, any>> {
    items: T[];
    value: string;
    reverse: boolean;
}

type SortFunction = <T extends Record<string, any>>(props: SortProps<T>) => T[];

export function useSort(game: Game): SortFunction {
    switch (game) {
        case "genshin":
            return sortGenshinItems;
        case "hsr":
            return sortHSRItems;
        case "wuwa":
            return sortWuWaItems;
        case "zzz":
            return sortZZZItems;
        case "uma":
            return sortUmaItems;
        case "endfield":
            return sortEndfieldItems;
        case "nte":
            return sortNTEItems;
    }
}
