import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { GameNoUma } from "@/types";
import type { CostValue } from "@/types/costs";
import type { PlannerItemData, SetItemValuesProps } from "@/types/planner";
import {
    createGenshinSlice,
    type GenshinPlannerSlice,
} from "./planner/useGenshinStore";
import { createHSRSlice, type HSRPlannerSlice } from "./planner/useHSRStore";
import { createWuWaSlice, type WuWaPlannerSlice } from "./planner/useWuWaStore";
import { createZZZSlice, type ZZZPlannerSlice } from "./planner/useZZZStore";
import {
    createEndfieldSlice,
    type EndfieldPlannerSlice,
} from "./planner/useEndfieldStore";
import { createNTESlice, type NTEPlannerSlice } from "./planner/useNTEStore";

export interface PlannerSlice {
    totalCost: Record<number, Record<string, CostValue>>;
    items: PlannerItemData[];
    hidden: number[];
    completed: CompletedMaterialKey[];
    setItems: (items: PlannerItemData[]) => void;
    deleteItem: (id: number) => void;
    setItemValues: (item: SetItemValuesProps) => void;
    setHiddenItems: (id: number) => void;
    updateTotalCosts: (id?: number, costs?: Record<string, CostValue>) => void;
    toggleCompleted: (key: CompletedMaterialKey) => void;
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

export type CompletedMaterialKey = `${string}:${string}`;

export function getCompletedMaterialKey(
    category: string,
    materialID: string,
): CompletedMaterialKey {
    return `${category}:${materialID}`;
}
