import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware } from "./middleware";

import websiteReducer from "reducers/website";
import bannerReducer from "reducers/banner";
import calendarReducer from "reducers/calendar";

const store = configureStore({
    reducer: {
        websites: websiteReducer,
        banners: bannerReducer,
        calendar: calendarReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
