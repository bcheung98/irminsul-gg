import type { Game, GameData } from "@/types";
import type { FilterGroups, FilterGroupsProps } from "@/types/filters";
import { useStore, useSettingsStore } from "@/stores";
import { endfieldFilters } from "@/data/endfield/filters";
import { genshinFilters } from "@/data/genshin/filters";
import { hsrFilters } from "@/data/hsr/filters";
import { umaFilters } from "@/data/uma/filters";
import { wuwaFilters } from "@/data/wuwa/filters";
import { zzzFilters } from "@/data/zzz/filters";
import { nteFilters } from "@/data/nte/filters";

type FilterGroupsFactory = (props: FilterGroupsProps) => FilterGroups;

const filterGroupFactories = {
    genshin: genshinFilters,
    hsr: hsrFilters,
    wuwa: wuwaFilters,
    zzz: zzzFilters,
    uma: umaFilters,
    endfield: endfieldFilters,
    nte: nteFilters,
} satisfies GameData<FilterGroupsFactory>;

export function filterGroups(game: Game, props: FilterGroupsProps) {
    return filterGroupFactories[game](props);
}

export function useFilterGroups(
    game: Game,
    props: Omit<FilterGroupsProps, "hideUnreleasedContent">,
) {
    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent,
    );
    return filterGroups(game, {
        ...props,
        hideUnreleasedContent,
    });
}
