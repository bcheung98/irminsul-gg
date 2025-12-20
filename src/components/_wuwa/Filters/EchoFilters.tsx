import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useSettingsStore } from "@/stores";
import { wuwaEchoFilters, useFilterStore } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";

// Type imports
import { Filters } from "@/types";
import { WuWaRarity } from "@/types/wuwa";

export interface WuWaEchoFilterState extends Filters {
    echoRarity: WuWaRarity[];
    sonata: number[];
    _sonata: string[];
}

export default function EchoFilters() {
    const game = useGameTag();
    const key = "wuwa/echoes";

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        wuwaEchoFilters,
        filters,
        clearFilterState
    );

    const { echoRarity, sonata } = filterGroups({
        key,
        filters,
        setFilters: setFilterState,
        hideUnreleasedContent,
    })[game];

    return <FilterRoot actions={actions} filters={[echoRarity, sonata]} />;
}
