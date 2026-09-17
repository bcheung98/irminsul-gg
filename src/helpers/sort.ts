import type { GameData, Item } from "@/types";
import type { SortProps } from "./_sort";
import sortGenshinItems from "./_sort/genshin";
import sortHSRItems from "./_sort/hsr";
import sortWuWaItems from "./_sort/wuwa";
import sortZZZItems from "./_sort/zzz";
import sortUmaItems from "./_sort/uma";
import sortEndfieldItems from "./_sort/endfield";
import sortNTEItems from "./_sort/nte";

type SortFunction = <T extends Item>(props: SortProps<T>) => T[];

export const gameSorters = {
    genshin: sortGenshinItems,
    hsr: sortHSRItems,
    wuwa: sortWuWaItems,
    zzz: sortZZZItems,
    uma: sortUmaItems,
    endfield: sortEndfieldItems,
    nte: sortNTEItems,
} satisfies GameData<SortFunction>;
