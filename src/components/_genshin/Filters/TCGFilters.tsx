import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { useGalleryStore } from "@/stores";
import { genshinTCGFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type { GenshinElement } from "@/types/genshin";
import type {
    TCGActionCardSubType,
    TCGFaction,
    TCGWeaponType,
} from "@/types/genshin/tcg";

export interface GenshinTCGFilterState extends Filters {
    "tcg-element": GenshinElement[];
    "tcg-weaponType": TCGWeaponType[];
    "tcg-faction": TCGFaction[];
    "tcg-group": TCGActionCardSubType[];
}

export default function TCGFilters() {
    const game = "genshin";
    const key = "genshin/tcg";

    const sortParams = useGalleryStore(useShallow((state) => state[key]));

    const {
        "tcg-element": element,
        "tcg-weaponType": weaponType,
        "tcg-faction": faction,
        "tcg-group": group,
    } = useFilterGroups(game, {
        key,
    });

    const groups =
        sortParams.view === "icon" ? [element, weaponType, faction] : [group];

    // useEffect(() => {
    //     clearFilterState(key, genshinTCGFilters);
    // }, [sortParams.view]);

    return (
        <FilterRoot
            initialState={genshinTCGFilters}
            filterKey={key}
            filters={groups}
        />
    );
}
