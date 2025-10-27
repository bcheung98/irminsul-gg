// Component imports
import Dropdown from "@/components/Dropdown";
import ToggleButtons from "@/components/ToggleButtons";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Type imports
import { FilterGroup } from "@/types";

interface FilterButtonsProps {
    filter: FilterGroup;
    grouped?: boolean;
}

export default function FilterButtons({ filter }: FilterButtonsProps) {
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
            <ToggleButtons
                buttons={filter.buttons}
                value={filter.value}
                onChange={filter.onChange}
                spacing={4}
                padding={filter.padding ?? 0}
            />
        </Dropdown>
    );
}
