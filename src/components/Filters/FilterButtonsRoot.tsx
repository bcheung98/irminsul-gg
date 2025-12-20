import { memo } from "react";

// Component imports
import ToggleButtons from "@/components/ToggleButtons";

// MUI imports
import Stack from "@mui/material/Stack";

// Type imports
import { ToggleButtonProps } from "@/components/ToggleButtons/ToggleButtons.types";
import { FilterButtonsProps } from "./FilterButtons";

interface Props extends FilterButtonsProps {
    buttons: ToggleButtonProps[];
}

const FilterButtonsRoot = memo(function FilterButtonsRoot({
    filter,
    buttons,
}: Props) {
    return (
        <Stack spacing={1}>
            {filter.toggle}
            <ToggleButtons
                buttons={buttons}
                value={filter.value}
                onChange={filter.onChange}
                spacing={4}
                padding={filter.padding ?? 0}
                width={filter.width}
            />
        </Stack>
    );
});

export default FilterButtonsRoot;
