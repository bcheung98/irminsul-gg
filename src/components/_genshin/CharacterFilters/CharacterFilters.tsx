import { BaseSyntheticEvent, useEffect, useState } from "react";

// Component imports
import Dropdown from "@/components/Dropdown";
import ToggleButtons from "@/components/ToggleButtons";
import { FilterDrawerActions } from "@/components/FilterDrawer";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { elements } from "@/data/genshin/common";
import { createFilterButtons } from "@/helpers/filters";
import { useFilterStore } from "@/stores/useFilterStore";

// Type imports
import {
    GenshinElement,
    GenshinRarity,
    GenshinWeaponType,
} from "@/types/genshin";
import { CharacterAscensionStat } from "@/types/genshin/character";
import { Filters } from "@/types";

export interface GenshinCharacterFilterState extends Filters {
    element: GenshinElement[];
    weaponType: GenshinWeaponType[];
    rarity: GenshinRarity[];
}

const initialState: GenshinCharacterFilterState = {
    element: [],
    weaponType: [],
    rarity: [],
};

export default function CharacterFilters() {
    const theme = useTheme();

    const setFilterState = useFilterStore().setFilterState;

    const filterGroups = (filters: GenshinCharacterFilterState) => ({
        element: {
            name: "Element",
            value: filters.element,
            buttons: createFilterButtons(elements, "genshin/elements"),
            onChange: (_: BaseSyntheticEvent, newValues: GenshinElement[]) =>
                setFilters({ ...filters, element: newValues }),
        },
    });

    const [filters, setFilters] = useState(initialState);

    const { element } = filterGroups(filters);

    const activeFilters = Object.values(filters).flat().length > 0;

    const clearFilters = () => {
        setFilters(initialState);
    };

    const params = {
        clearFilters,
        activeFilters,
    };

    useEffect(() => {
        setFilterState("genshin/character", filters);
    }, [filters]);

    return (
        <Stack spacing={2}>
            <FilterDrawerActions {...params} />
            <Stack spacing={1}>
                {[element].map((filter) => (
                    <Dropdown
                        key={filter.name}
                        title={filter.name}
                        titleColor={
                            filter.value.length > 0
                                ? theme.text.selected
                                : theme.drawer.color.primary
                        }
                        contentPadding="4px 0px 4px 24px"
                    >
                        <ToggleButtons
                            buttons={filter.buttons}
                            value={filter.value}
                            onChange={filter.onChange}
                            spacing={4}
                            padding={0}
                        />
                    </Dropdown>
                ))}
            </Stack>
        </Stack>
    );
}
