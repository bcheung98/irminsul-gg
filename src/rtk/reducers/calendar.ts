import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startAppListening } from "helpers/hooks";

interface GameSettings {
    enabled: boolean;
    server: string;
    fullDuration: boolean;
}

export interface CalendarSettings {
    [game: string]: GameSettings;
}

localStorage.removeItem("calendar/display");
localStorage.removeItem("calendar/dropdown");
localStorage.removeItem("calendar/filters");
const storedSettings = localStorage.getItem("calendar/settings") || "{}";

const initialState: CalendarSettings = JSON.parse(storedSettings);

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        setSettings: (state, action: PayloadAction<CalendarSettings>) => {
            Object.assign(state, action.payload);
        },
        setGameSettings: (
            state,
            action: PayloadAction<{ game: string; settings: GameSettings }>
        ) => {
            state[action.payload.game] = action.payload.settings;
        },
        setGameEnabled: (state, action: PayloadAction<{ game: string }>) => {
            state[action.payload.game].enabled =
                !state[action.payload.game].enabled;
        },
        setServer: (
            state,
            action: PayloadAction<{ game: string; server: string }>
        ) => {
            state[action.payload.game].server = action.payload.server;
        },
        setFullDuration: (state, action: PayloadAction<{ game: string }>) => {
            state[action.payload.game].fullDuration =
                !state[action.payload.game].fullDuration;
        },
    },
    selectors: {
        selectSettings: (state): CalendarSettings => state,
    },
});

export const {
    setSettings,
    setGameSettings,
    setGameEnabled,
    setServer,
    setFullDuration,
} = calendarSlice.actions;

export const { selectSettings } = calendarSlice.selectors;

export default calendarSlice.reducer;

startAppListening({
    actionCreator: setSettings,
    effect: (action) => {
        localStorage.setItem(
            "calendar/settings",
            JSON.stringify(action.payload)
        );
        window.dispatchEvent(new Event("storage"));
    },
});

window.addEventListener("storage", (event) => {
    if (event.key === "calendar/settings") {
        window.location.reload();
    }
});
