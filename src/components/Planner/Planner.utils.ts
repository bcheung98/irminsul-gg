import { createContext, useContext } from "react";
import { DataType } from "@/types";

export const PlannerDataContext = createContext<{
    characters: DataType[];
    weapons: DataType[];
}>({ characters: [], weapons: [] });

export function usePlannerData() {
    return useContext(PlannerDataContext);
}
