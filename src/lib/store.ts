import { configureStore } from "@reduxjs/toolkit";

import browserReducer from "./features/browser/browserSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            browser: browserReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
