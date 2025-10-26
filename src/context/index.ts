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
export const SearchContext = createContext<string>("");

export function useGameList() {
    return useContext(GameListContext);
}

export function useGame() {
    return useContext(GameContext);
}

export function useGameTag() {
    const context = useGame();
    return (context ? context.tag : "") as Game;
}

export function useDataContext() {
    return useContext(DataContext);
}

export function useSkillContext() {
    return useContext(SkillContext);
}

export function useSearchContext() {
    return useContext(SearchContext);
}
