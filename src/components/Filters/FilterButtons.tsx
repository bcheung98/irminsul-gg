// Component imports
import Dropdown from "@/components/Dropdown";
import ToggleButtons from "@/components/ToggleButtons";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Type imports
import { FilterGroup } from "@/types";
import { ToggleButtonProps } from "@/components/ToggleButtons/ToggleButtons.types";

interface FilterButtonsProps {
    filter: FilterGroup;
}

export default function FilterButtons({ filter }: FilterButtonsProps) {
    const theme = useTheme();

    function renderButton(buttons: ToggleButtonProps[]) {
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
    }

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
                    {filter.groupButtons.map((group, index) => (
                        <Dropdown
                            key={index}
                            img={group.icon}
                            imgStyle={{ borderRadius: "4px" }}
                            title={group.label}
                            titleColor={theme.text.primary}
                        >
                            {renderButton(group.buttons)}
                        </Dropdown>
                    ))}
                </Stack>
            ) : (
                renderButton(filter.buttons)
            )}
        </Dropdown>
    );
}
