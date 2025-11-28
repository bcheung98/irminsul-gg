import { CardMode, CostSliderValues, PlannerType } from "@/types/planner";

export interface PlannerSliderProps {
    mode: CardMode;
    type: PlannerType;
    skillKey: string;
    icon?: string;
    levels: (string | number)[];
    values: CostSliderValues;
    rarity: number;
    weaponType: string;
    color?: string;
}

export type SliderList = Pick<
    PlannerSliderProps,
    "skillKey" | "icon" | "levels" | "values"
>[];
