import { useMemo } from "react";

import type { Game, GameData } from "@/types";
import type { FilterGroups, FilterGroupsProps } from "@/types/filters";
import { useStore, useSettingsStore } from "@/stores";
import { endfieldFilters } from "@/components/_endfield/Filters";
import { genshinFilters } from "@/components/_genshin/Filters";
import { hsrFilters } from "@/components/_hsr/Filters";
import { umaFilters } from "@/components/_uma/Filters";
import { wuwaFilters } from "@/components/_wuwa/Filters";
import { zzzFilters } from "@/components/_zzz/Filters";
import { nteFilters } from "@/components/_nte/Filters";

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

    const { key } = props;

    return useMemo(
        () =>
            filterGroups(game, {
                key,
                hideUnreleasedContent,
            }),
        [game, key, hideUnreleasedContent],
    );
}
