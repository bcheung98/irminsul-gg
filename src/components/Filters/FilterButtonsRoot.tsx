// Component imports
import ToggleButtons from "@/components/ToggleButtons";

// Type imports
import type { FilterButtonRootProps } from "./Filters.types";

export default function FilterButtonsRoot({
    filter,
    buttons,
    value,
    onChange,
}: FilterButtonRootProps) {
    return (
        <ToggleButtons
            buttons={buttons}
            value={value}
            onChange={onChange}
            spacing={4}
            padding={filter.padding ?? 0}
            width={filter.width}
        />
    );
}
