import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GameNoUma } from "@/types";
import { CostValue } from "@/types/costs";
import { PlannerItemData, SetItemValuesProps } from "@/types/planner";

import {
    createGenshinSlice,
    GenshinPlannerSlice,
} from "./planner/useGenshinStore";
import { createHSRSlice, HSRPlannerSlice } from "./planner/useHSRStore";
import { createWuWaSlice, WuWaPlannerSlice } from "./planner/useWuWaStore";
import { createZZZSlice, ZZZPlannerSlice } from "./planner/useZZZStore";

export interface PlannerSlice {
    totalCost: Record<number | string, Record<string, CostValue>>;
    items: PlannerItemData[];
    hidden: (number | string)[];
    setItems: (items: PlannerItemData[]) => void;
    setItemValues: (item: SetItemValuesProps) => void;
    setHiddenItems: (id: number | string) => void;
    updateTotalCosts: (
        id?: number | string,
        costs?: Record<string, CostValue>
    ) => void;
}

export type GamePlannerSlice<G extends GameNoUma, T> = {
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
