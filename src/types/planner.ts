import { BaseDataWithRelease } from ".";
import { Materials } from "./materials";

export type PlannerType = "characters" | "weapons";
export type CardMode = "edit" | "view";

export interface PlannerItemData extends BaseDataWithRelease {
    id: number;
    name: string;
    displayName: string;
    fullName?: string;
    rarity: number;
    element?: string;
    weaponType: string;
    materials: Materials;
    values: Record<string, CostSliderValues>;
}

export interface CostSliderValues {
    start: number;
    stop: number;
    selected: boolean;
}

export interface SetItemValuesProps {
    id: number;
    skillKey: string;
    values: CostSliderValues;
}
