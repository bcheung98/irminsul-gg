// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { wuwaEchoFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type { WuWaRarity } from "@/types/wuwa";

export interface WuWaEchoFilterState extends Filters {
    echoRarity: WuWaRarity[];
    sonata: number[];
    _sonata: string[];
}

export default function EchoFilters() {
    const game = "wuwa";
    const key = "wuwa/echoes";

    const { echoRarity, sonata } = useFilterGroups(game, {
        key,
    });

    return (
        <FilterRoot
            initialState={wuwaEchoFilters}
            filterKey={key}
            filters={[echoRarity, sonata]}
        />
    );
}
