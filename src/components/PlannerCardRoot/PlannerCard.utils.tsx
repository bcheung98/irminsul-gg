import { CardMode, PlannerItemData } from "@/types/planner";
import { createContext, useContext } from "react";

export const PlannerCardContext = createContext<PlannerItemData | null>(null);
export const PlannerCardModeContext = createContext<CardMode>("view");

export function usePlannerCardData() {
    return useContext(PlannerCardContext);
}

export function usePlannerCardMode() {
    return useContext(PlannerCardModeContext);
}
