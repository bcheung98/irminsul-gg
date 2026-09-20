import { Dispatch, SetStateAction } from "react";

// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import ToggleButtons from "@/components/ToggleButtons";

// Type imports
import type { Item } from "@/types";
import type { FilterGroup } from "@/types/filters";

export function AddCustomAttribute({
    item,
    filter,
    setItem,
}: {
    item: Item;
    filter: FilterGroup;
    setItem: Dispatch<SetStateAction<Item>>;
}) {
    const handleAttributeSelect = (
        _: React.BaseSyntheticEvent,
        value: string | number,
    ) => {
        setItem((current) => ({
            ...current,
            [`${filter.tag}`]: value,
        }));
    };

    return (
        <FlexBox key={filter.tag} spacing={1}>
            <Text
                variant="subtitle1"
                weight="highlight"
                sx={{ minWidth: "80px" }}
            >
                {filter.name}
            </Text>
            <ToggleButtons
                buttons={filter.buttons}
                value={item[filter.tag]}
                spacing={4}
                padding={filter.padding ?? 0}
                width={filter.width}
                exclusive
                onChange={handleAttributeSelect}
            />
        </FlexBox>
    );
}
