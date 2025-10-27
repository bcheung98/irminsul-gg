import { BaseSyntheticEvent, useState } from "react";

// Component imports
import Dropdown from "@/components/Dropdown";
import ToggleButtons from "@/components/ToggleButtons";
import { FilterDrawerActions } from "@/components/FilterDrawer";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { createFilterButtons } from "@/helpers/filters";
import { elements } from "@/data/genshin/common";

// Type imports
import {
    GenshinElement,
    GenshinRarity,
    GenshinWeaponType,
} from "@/types/genshin";
import { CharacterAscensionStat } from "@/types/genshin/character";

interface CharacterFilterState {
    element: GenshinElement[];
    weaponType: GenshinWeaponType[];
    rarity: GenshinRarity[];
}

const initialState: CharacterFilterState = {
    element: [],
    weaponType: [],
    rarity: [],
};

export default function CharacterFilters() {
    const theme = useTheme();

    const filterGroups = (filters: CharacterFilterState) => ({
        element: {
            name: "Element",
            value: filters.element,
            buttons: createFilterButtons(elements, "genshin/elements"),
            onChange: (_: BaseSyntheticEvent, newValues: GenshinElement[]) =>
                setFilters({ ...filters, element: newValues }),
        },
    });

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };
    const [filters, setFilters] = useState(initialState);

    const { element } = filterGroups(filters);

    const activeFilters =
        Object.values(filters).flat().length > 0 || searchValue !== "";

    const clearFilters = () => {
        setFilters(initialState);
        setSearchValue("");
    };

    const params = {
        clearFilters,
        activeFilters,
        searchValue,
        handleInputChange,
    };

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
