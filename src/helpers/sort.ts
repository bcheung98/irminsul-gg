import { GameData } from "@/types";
import sortGenshinItems from "./genshin/sortItems";
import sortHSRItems from "./hsr/sortItems";
import sortWuWaItems from "./wuwa/sortItems";
import sortZZZItems from "./zzz/sortItems";
import sortUmaItems from "./uma/sortItems";
import sortEndfieldItems from "./endfield/sortItems";

export interface SortProps<T extends Record<string, any>> {
    items: T[];
    value: string;
    reverse: boolean;
}

type SortFunction = <T extends Record<string, any>>(props: SortProps<T>) => T[];

export function useSort(): GameData<SortFunction> {
    return {
        genshin: sortGenshinItems,
        hsr: sortHSRItems,
        wuwa: sortWuWaItems,
        zzz: sortZZZItems,
        uma: sortUmaItems,
        endfield: sortEndfieldItems,
    };
}
