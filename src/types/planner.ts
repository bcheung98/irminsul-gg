import { BaseDataWithRelease } from ".";
import { Materials } from "./materials";

export type PlannerType = "characters" | "weapons";

export interface PlannerItemData extends BaseDataWithRelease {
    id: number | string;
    name: string;
    displayName: string;
    rarity: number;
    element?: string;
    weaponType: string;
    materials: Materials;
}
