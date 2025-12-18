import { memo } from "react";

// Component imports
import FilterButtonsRoot from "./FilterButtonsRoot";
import Dropdown from "@/components/Dropdown";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Type imports
import { FilterGroup } from "@/types";

export interface FilterButtonsProps {
    filter: FilterGroup;
}

const FilterButtons = memo(function ({ filter }: FilterButtonsProps) {
    const theme = useTheme();

    return (
        <Dropdown
            title={filter.name}
            titleColor={
                filter.value.length > 0
                    ? theme.text.selected
                    : theme.drawer.color.primary
            }
            contentPadding="4px 0px 4px 24px"
        >
            {filter.groupButtons ? (
                <Stack spacing={1}>
                    {filter.groupButtons.map((group, index) =>
                        group.dropdown ? (
                            <Dropdown
                                key={index}
                                img={group.icon}
                                imgStyle={{ borderRadius: "4px" }}
                                title={group.label}
                                titleColor={theme.text.primary}
                            >
                                <FilterButtonsRoot
                                    filter={filter}
                                    buttons={group.buttons}
                                />
                            </Dropdown>
                        ) : (
                            <FilterButtonsRoot
                                key={index}
                                filter={filter}
                                buttons={group.buttons}
                            />
                        )
                    )}
                </Stack>
            ) : (
                <FilterButtonsRoot filter={filter} buttons={filter.buttons} />
            )}
        </Dropdown>
    );
});

export default FilterButtons;
