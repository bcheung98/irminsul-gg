import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createPlannerSlice } from "./createPlannerSlice";
import type { GameNoUma } from "@/types";
import type { CostValue } from "@/types/costs";
import type {
    PlannerItemData,
    PlannerTeam,
    SetItemValuesProps,
} from "@/types/planner";

interface PlannerState {
    totalCost: Record<number, Record<string, CostValue>>;
    items: PlannerItemData[];
    hidden: number[];
    completed: CompletedMaterialKey[];
    teams: PlannerTeam[];
    activeTeamId: string | null;
}

interface PlannerActions {
    setItems: (items: PlannerItemData[]) => void;
    addItem: (item: PlannerItemData) => void;
    deleteItem: (id: number) => void;
    setItemValues: (item: SetItemValuesProps) => void;
    setHiddenItems: (id: number) => void;
    updateTotalCosts: (id?: number, costs?: Record<string, CostValue>) => void;
    toggleCompleted: (key: CompletedMaterialKey) => void;
    createTeam: (options?: { itemID?: number; activate?: boolean }) => void;
    renameTeam: (id: string, name: string) => void;
    deleteTeam: (id: string) => void;
    setActiveTeam: (id: string | null) => void;
    setTeamItem: (itemID: number, teamID: string, included: boolean) => void;
    setTeamItemOrder: (teamID: string, itemIDs: number[]) => void;
}

export type PlannerSlice = PlannerState & PlannerActions;

export type GamePlannerSlice<G extends GameNoUma, T> = {
    [K in keyof T as `${G}/${string & K}`]: T[K];
};

export type CombinedPlannerSlice = {
    [K in keyof PlannerSlice as `${GameNoUma}/${string & K}`]: PlannerSlice[K];
};

export const usePlannerStore = create(
    persist<CombinedPlannerSlice>(
        (...args) => ({
            ...createPlannerSlice("genshin")(...args),
            ...createPlannerSlice("hsr")(...args),
            ...createPlannerSlice("wuwa")(...args),
            ...createPlannerSlice("zzz")(...args),
            ...createPlannerSlice("endfield")(...args),
            ...createPlannerSlice("nte")(...args),
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
