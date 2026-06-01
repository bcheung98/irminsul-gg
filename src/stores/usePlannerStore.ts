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
import {
    createEndfieldSlice,
    EndfieldPlannerSlice,
} from "./planner/useEndfieldStore";
import { createNTESlice, NTEPlannerSlice } from "./planner/useNTEStore";

export interface PlannerSlice {
    totalCost: Record<number, Record<string, CostValue>>;
    items: PlannerItemData[];
    hidden: number[];
    setItems: (items: PlannerItemData[]) => void;
    setItemValues: (item: SetItemValuesProps) => void;
    setHiddenItems: (id: number) => void;
    updateTotalCosts: (id?: number, costs?: Record<string, CostValue>) => void;
}

export type GamePlannerSlice<G extends GameNoUma, T> = {
    [K in keyof T as `${G}/${string & K}`]: T[K];
};

export type CombinedPlannerSlice = GenshinPlannerSlice &
    HSRPlannerSlice &
    WuWaPlannerSlice &
    ZZZPlannerSlice &
    EndfieldPlannerSlice &
    NTEPlannerSlice;

export const usePlannerStore = create(
    persist<CombinedPlannerSlice>(
        (...args) => ({
            ...createGenshinSlice(...args),
            ...createHSRSlice(...args),
            ...createWuWaSlice(...args),
            ...createZZZSlice(...args),
            ...createEndfieldSlice(...args),
            ...createNTESlice(...args),
        }),
        {
            name: "v2/planner",
        },
    ),
);
