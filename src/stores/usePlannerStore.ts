import { create } from "zustand";
import { createGenshinSlice, GenshinSlice } from "./planner/useGenshinStore";

export const usePlannerStore = create<GenshinSlice>()((...args) => ({
    ...createGenshinSlice(...args),
}));
