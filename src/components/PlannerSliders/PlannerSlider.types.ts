import { Materials } from "@/types/materials";
import { CardMode, CostSliderValues, PlannerType } from "@/types/planner";

export interface PlannerSliderProps {
    mode: CardMode;
    type: PlannerType;
    id: number;
    skillKey: string;
    icon?: string;
    levels: (string | number)[];
    values: CostSliderValues;
    materials: Materials;
    rarity: number;
    weaponType: string;
    color?: string;
}

export type SliderList = Pick<
    PlannerSliderProps,
    "skillKey" | "icon" | "levels" | "values"
>[];
