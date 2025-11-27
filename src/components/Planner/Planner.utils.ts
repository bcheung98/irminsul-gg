import { PlannerItemData } from "@/types/planner";
import { createContext, useContext } from "react";

export const PlannerDataContext = createContext<{
    characters: PlannerItemData[];
    weapons: PlannerItemData[];
}>({ characters: [], weapons: [] });

export function usePlannerData() {
    return useContext(PlannerDataContext);
}
