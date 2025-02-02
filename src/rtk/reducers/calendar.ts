import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startAppListening } from "helpers/hooks";
import { Region } from "helpers/dates";

export interface CalendarState {
    filters: string[];
    server: Region;
    display: boolean;
}

const storedFilters = localStorage.getItem("calendar/filters") || "null";
const storedServer = localStorage.getItem("calendar/server") || "null";
const storedDisplay = localStorage.getItem("calendar/display") || "null";

const initialState: CalendarState = {
    filters: storedFilters !== "null" ? JSON.parse(storedFilters) : ["NULL"],
    server: storedServer !== "null" ? JSON.parse(storedServer) : "NA",
    display: storedDisplay !== "null" ? JSON.parse(storedDisplay) : false,
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<string[]>) => {
            state.filters = action.payload;
        },
        setServer: (state, action: PayloadAction<Region>) => {
            state.server = action.payload;
        },
        setDisplay: (state) => {
            state.display = !state.display;
        },
    },
    selectors: {
        selectFilters: (state): string[] => state.filters,
        selectServer: (state): Region => state.server,
        selectDisplay: (state): boolean => state.display,
    },
});

export const { setFilters, setServer, setDisplay } = calendarSlice.actions;

export const { selectFilters, selectServer, selectDisplay } =
    calendarSlice.selectors;

export default calendarSlice.reducer;

startAppListening({
    actionCreator: setFilters,
    effect: (action) => {
        const data = JSON.stringify(action.payload);
        if (data !== storedFilters) {
            localStorage.setItem("calendar/filters", data);
        }
    },
});

startAppListening({
    actionCreator: setServer,
    effect: (action) => {
        const data = JSON.stringify(action.payload);
        if (data !== storedServer) {
            localStorage.setItem("calendar/server", data);
        }
    },
});

startAppListening({
    actionCreator: setDisplay,
    effect: (_, currentState) => {
        const data = JSON.stringify(currentState.getState().calendar.display);
        if (data !== storedDisplay) {
            localStorage.setItem("calendar/display", data);
        }
    },
});
