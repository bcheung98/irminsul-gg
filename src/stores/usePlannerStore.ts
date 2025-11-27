import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Game } from "@/types";
import { PlannerItemData } from "@/types/planner";

import {
    createGenshinSlice,
    GenshinPlannerSlice,
} from "./planner/useGenshinStore";
import { createHSRSlice, HSRPlannerSlice } from "./planner/useHSRStore";
import { createWuWaSlice, WuWaPlannerSlice } from "./planner/useWuWaStore";
import { createZZZSlice, ZZZPlannerSlice } from "./planner/useZZZStore";

export interface PlannerSlice {
    totalCost: Record<string, any>;
    items: PlannerItemData[];
    hidden: number[];
    setItems: (items: PlannerItemData[]) => void;
    updateItemCosts: () => void;
    updateTotalCosts: () => void;
    toggleHidden: (id: number) => void;
}

export type GamePlannerSlice<G extends Game, T> = {
    [K in keyof T as `${G}/${string & K}`]: T[K];
};

export type CombinedPlannerSlice = GenshinPlannerSlice &
    HSRPlannerSlice &
    WuWaPlannerSlice &
    ZZZPlannerSlice;

export const usePlannerStore = create(
    persist<CombinedPlannerSlice>(
        (...args) => ({
            ...createGenshinSlice(...args),
            ...createHSRSlice(...args),
            ...createWuWaSlice(...args),
            ...createZZZSlice(...args),
        }),
        {
            name: "v2/planner",
        }
    )
);
