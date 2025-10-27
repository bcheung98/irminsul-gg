import { genshinFilters } from "@/data/genshin/filters";
import { FilterGroups, FilterGroupsProps, Filters, GameData } from "@/types";

export function filterGroups<T extends Filters>(
    props: FilterGroupsProps<T>
): GameData<FilterGroups> {
    return {
        genshin: genshinFilters(props),
        hsr: {},
        wuwa: {},
        zzz: {},
        uma: {},
    };
}
