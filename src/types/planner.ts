import { BaseDataWithRelease } from ".";
import {
    HSRCharacterTraceNodeMain,
    HSRCharacterTraceNodeSmall,
} from "./hsr/character";
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
    traces?: (HSRCharacterTraceNodeMain | HSRCharacterTraceNodeSmall)[];
    values: Record<string, CostSliderValues>;
}

export interface CostSliderValues {
    start: number;
    stop: number;
    selected: boolean;
    type?: string;
    skillKey?: string;
}

export interface SetItemValuesProps {
    id: number;
    skillKey: string;
    values: CostSliderValues;
}
