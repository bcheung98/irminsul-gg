import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createGenshinSlice, GenshinSlice } from "./planner/useGenshinStore";

export const usePlannerStore = create<GenshinSlice>()(
    persist(
        (...args) => ({
            ...createGenshinSlice(...args),
        }),
        { name: "v2/planner" }
    )
);
