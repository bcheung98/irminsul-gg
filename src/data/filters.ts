import { FilterGroups, FilterGroupsProps, Filters, GameData } from "@/types";
import { genshinFilters } from "./genshin/filters";
import { hsrFilters } from "./hsr/filters";
import { wuwaFilters } from "./wuwa/filters";
import { zzzFilters } from "./zzz/filters";
import { umaFilters } from "./uma/filters";

export function filterGroups<T extends Filters>(
    props: FilterGroupsProps<T>
): GameData<FilterGroups> {
    return {
        genshin: genshinFilters(props),
        hsr: hsrFilters(props),
        wuwa: wuwaFilters(props),
        zzz: zzzFilters(props),
        uma: umaFilters(props),
    };
}
