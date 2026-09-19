import { CustomMaterials } from "@/components/PlannerMaterials/PlannerMaterials.utils";
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
    custom?: boolean;
    id: number;
    name: string;
    displayName: string;
    fullName?: string;
    rarity: number;
    element?: string;
    weaponType: string;
    specialty?: EndfieldClass;
    materials: Materials;
    customMaterials?: CustomMaterials;
    traces?: (HSRCharacterTraceNodeMain | HSRCharacterTraceNodeSmall)[];
    bonusStats?: WuWaCharacterBonusStats;
    mainAttribute?: EndfieldStatAttribute;
    baseSkills?: EndfieldCharacterPassive[];
    lifeSkills?: number[];
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
