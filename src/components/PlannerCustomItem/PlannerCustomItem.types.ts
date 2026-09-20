import type { FilterGroup } from "@/types/filters";
import type { PlannerItemData, PlannerType } from "@/types/planner";

export type MaterialValue = MaterialRow | string | null;

export interface MaterialRow {
    groupKey?: string | undefined;
    icon: React.ReactNode;
    title: string | number;
    value: string | number;
    inputValue?: string;
}

export interface PlannerCustomItemProps {
    label: string;
    sampleItem: PlannerItemData;
    handleSelect: (option: PlannerItemData | null) => void;
    groups: FilterGroup[];
    type: PlannerType;
}

export interface CustomItemCreatorProps extends PlannerCustomItemProps {
    handleClose: () => void;
}
