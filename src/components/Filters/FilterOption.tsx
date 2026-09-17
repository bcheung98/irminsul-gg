// Component imports
import FlexBox from "@/components/FlexBox";
import Switch from "@/components/Switch";
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";

// MUI imports
import HelpIcon from "@mui/icons-material/Help";

// Helper imports
import { useFilterStore } from "@/stores";

// Type imports
import type { FilterOptionProps } from "./Filters.types";

export default function FilterOption({ filterKey, option }: FilterOptionProps) {
    const value = useFilterStore((state) => state[filterKey][option.tag]);
    const setFilterState = useFilterStore((state) => state.setFilterState);

    return (
        <FlexBox spacing={1} wrap sx={{ mb: 1 }}>
            <Switch
                checked={value.includes("true")}
                onChange={() =>
                    setFilterState(
                        filterKey,
                        option.tag,
                        value.includes("true") ? ["false"] : ["true"],
                    )
                }
                size="small"
            />
            <Text variant="body2" weight="highlight">
                Match All
            </Text>
            <Tooltip title={option.text} arrow placement="top">
                <HelpIcon
                    sx={(theme) => ({
                        fontSize: "18px",
                        color: theme.drawer.color.primary,
                        mb: 0.5,
                    })}
                />
            </Tooltip>
        </FlexBox>
    );
}
