import { createContext, useContext } from "react";
import { Game, GameInfo } from "@/types";
import { CharacterSkillsList } from "@/types/skill";

const defaultGameInfo = {
    tag: "",
    name: "",
    shortName: "",
    enabled: true,
    color: "rgb(11, 110, 175)",
    dev: "",
};

export const GameListContext = createContext<GameInfo[]>([]);
export const GameContext = createContext<GameInfo>(defaultGameInfo);
export const DataContext = createContext<any[]>([]);
export const SkillContext = createContext<CharacterSkillsList | null>(null);

export function useGameList() {
    return useContext(GameListContext);
}

export function useGame() {
    return useContext(GameContext);
}

export function useGameTag() {
    return useContext(GameContext).tag as Game;
}

export function useDataContext() {
    return useContext(DataContext);
}

export function useSkillContext() {
    return useContext(SkillContext);
}
