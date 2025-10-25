import { ToggleButtonProps } from "@/components/ToggleButtons/ToggleButtons.types";
import { themeList } from "@/themes/theme";

export const themeButtons: ToggleButtonProps[] = themeList.map((theme) => ({
    value: theme.id,
    label: theme.name,
}));

export const statDisplayButtons: ToggleButtonProps[] = [
    { value: "slider", label: "Slider" },
    { value: "table", label: "Table" },
];
