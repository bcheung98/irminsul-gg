import type { CustomMaterials } from "./materials";
import type { BaseDataWithRelease } from ".";
import type { EndfieldClass, EndfieldStatAttribute } from "./endfield";
import type { EndfieldCharacterPassive } from "./endfield/character";
import type {
    HSRCharacterTraceNodeMain,
    HSRCharacterTraceNodeSmall,
    HSRCharacterTraceStats,
} from "./hsr/character";
import type { Materials } from "./materials";
import type { WuWaCharacterBonusStats } from "./wuwa/character";

export type PlannerType = "characters" | "weapons";
export type CardMode = "edit" | "view";

export interface PlannerItemData extends BaseDataWithRelease {
    custom?: boolean;
    id: number;
    name: string;
    displayName: string;
    rarity: number;
    element?: string;
    weaponType: string;
    specialty?: EndfieldClass;
    materials: Materials;
    customMaterials?: CustomMaterials;
    // traces?: (HSRCharacterTraceNodeMain | HSRCharacterTraceNodeSmall)[];
    traceStats?: HSRCharacterTraceStats;
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

// Legacy HSR trace format
export type LegacyPlannerItemData = PlannerItemData & {
    traces?: unknown;
};
