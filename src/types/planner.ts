import { BaseDataWithRelease } from ".";
import { EndfieldClass, EndfieldStatAttribute } from "./endfield";
import { EndfieldCharacterPassive } from "./endfield/character";
import {
    HSRCharacterTraceNodeMain,
    HSRCharacterTraceNodeSmall,
} from "./hsr/character";
import { Materials } from "./materials";
import { WuWaCharacterBonusStats } from "./wuwa/character";

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
    specialty?: EndfieldClass;
    materials: Materials;
    traces?: (HSRCharacterTraceNodeMain | HSRCharacterTraceNodeSmall)[];
    bonusStats?: WuWaCharacterBonusStats;
    mainAttribute?: EndfieldStatAttribute;
    baseSkills?: EndfieldCharacterPassive[];
    talents?: EndfieldCharacterPassive[];
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
