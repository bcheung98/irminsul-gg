import { memo } from "react";

// Component imports
import ToggleButtons from "@/components/ToggleButtons";

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
        <ToggleButtons
            buttons={buttons}
            value={filter.value}
            onChange={filter.onChange}
            spacing={4}
            padding={filter.padding ?? 0}
            width={filter.width}
        />
    );
});

export default FilterButtonsRoot;
