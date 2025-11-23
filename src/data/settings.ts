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

export const serverButtons: ToggleButtonProps[] = [
    { value: "NA", label: "NA" },
    { value: "EU", label: "EU" },
    { value: "Asia", label: "Asia" },
];

export const serverButtonsUma: ToggleButtonProps[] = [
    { value: "NA", label: "Global" },
    { value: "Asia", label: "JP" },
];

export const forbiddenKnowledge: ToggleButtonProps[] = [
    // The boolean determines if unreleased content should be hidden,
    // but the label determines if unreleased content should be shown,
    // hence why the value and label seem paradoxical.
    { value: true, label: "Disable" },
    { value: false, label: "Enable" },
];
