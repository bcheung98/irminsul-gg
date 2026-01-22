import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Game, GameData, Server } from "@/types";

export type ServerState = GameData<Server>;

export interface ServerActions {
    setServer: (game: Game, server: Server) => void;
}

export type ServerStore = ServerState & ServerActions;

export const initialState: ServerState = {
    genshin: "NA",
    hsr: "NA",
    wuwa: "NA",
    zzz: "NA",
    uma: "NA",
    endfield: "NA",
};

export const useServerStore = create(
    persist<ServerStore>(
        (set) => ({
            ...initialState,
            setServer: function (game, server) {
                return set(() => ({ [`${game}`]: server }));
            },
        }),
        { name: "v2/server" },
    ),
);
