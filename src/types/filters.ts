import type { FilterState } from "@/stores/useFilterStore";

export type Filters = Record<string, (string | number)[]>;
export type FilterKey = keyof FilterState;
export interface FilterGroupsProps {
    key: keyof FilterState;
    hideUnreleasedContent?: boolean;
}
export type FilterGroups = Record<string, FilterGroup>;
export interface FilterGroup {
    tag: string;
    name: string;
    buttons: FilterButtons[];
    option?: FilterOption;
    padding?: string | number;
    width?: string;
    groupButtons?: GroupFilterButtons[];
    customMaterial?: CustomMaterialConfig; // Define material data for Ascension Planner custom materials
}
export interface FilterButtons {
    value: string | number;
    icon?: React.ReactNode;
    label?: React.ReactNode;
}
export interface GroupFilterButtons {
    buttons: FilterButtons[];
    icon?: string;
    label?: string;
    dropdown?: boolean;
}
export interface FilterOption {
    type: "matchAll";
    tag: string;
    text: string;
}

interface CustomMaterialConfig {
    rarities: number[];
}
