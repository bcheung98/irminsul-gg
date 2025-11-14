import { GameData } from "@/types";
import sortGenshinItems from "./genshin/sortItems";

export interface SortProps<T extends Record<string, any>> {
    items: T[];
    value: string;
    reverse: boolean;
}

type SortFunction = <T extends Record<string, any>>(props: SortProps<T>) => T[];

export function useSort(): GameData<SortFunction> {
    return {
        genshin: sortGenshinItems,
        hsr: function () {
            throw new Error("Function not implemented.");
        },
        wuwa: function () {
            throw new Error("Function not implemented.");
        },
        zzz: function () {
            throw new Error("Function not implemented.");
        },
        uma: function () {
            throw new Error("Function not implemented.");
        },
    };
}
