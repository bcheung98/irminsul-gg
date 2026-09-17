import { memo } from "react";

// Component imports
import FilterButtonsRoot from "./FilterButtonsRoot";
import FilterOption from "./FilterOption";
import Dropdown from "@/components/Dropdown";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { useFilterStore } from "@/stores";

// Type imports
import type { FilterButtonsProps } from "./Filters.types";

const FilterButtons = memo(function FilterButtons({
    filterKey,
    filter,
}: FilterButtonsProps) {
    const theme = useTheme();

    const { tag, name } = filter;

    const value = useFilterStore((state) => state[filterKey][tag]);
    const setFilterState = useFilterStore((state) => state.setFilterState);

    const handleChange = (
        _: React.BaseSyntheticEvent,
        newValues: (string | number)[],
    ) => {
        setFilterState(filterKey, tag, newValues);
    };

    return (
        <Dropdown
            title={name}
            titleColor={
                value.length > 0
                    ? theme.text.selected
                    : theme.drawer.color.primary
            }
            contentPadding="4px 0px 4px 24px"
        >
            {filter.option && (
                <FilterOption filterKey={filterKey} option={filter.option} />
            )}
            {filter.groupButtons ? (
                <Stack spacing={1}>
                    {filter.groupButtons.map((group) =>
                        group.dropdown ? (
                            <Dropdown
                                key={group.label}
                                img={group.icon}
                                imgStyle={{ borderRadius: "4px" }}
                                title={group.label}
                                titleColor={theme.text.primary}
                            >
                                <FilterButtonsRoot
                                    filter={filter}
                                    buttons={group.buttons}
                                    value={value}
                                    onChange={handleChange}
                                />
                            </Dropdown>
                        ) : (
                            <FilterButtonsRoot
                                key={group.label}
                                filter={filter}
                                buttons={group.buttons}
                                value={value}
                                onChange={handleChange}
                            />
                        ),
                    )}
                </Stack>
            ) : (
                <FilterButtonsRoot
                    filter={filter}
                    buttons={filter.buttons}
                    value={value}
                    onChange={handleChange}
                />
            )}
        </Dropdown>
    );
});

export default FilterButtons;
