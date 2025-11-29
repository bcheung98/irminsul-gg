import { createContext, useContext } from "react";
import { Game, GameInfo } from "@/types";
import { CharacterSkillsList } from "@/types/skill";
import { CharacterBuffs } from "@/types/character";

const defaultGameInfo = {
    tag: "" as Game,
    name: "",
    shortName: "",
    enabled: true,
    color: "rgb(11, 110, 175)",
    dev: "",
};

const defaultCharacterBuff = {
    versions: [{ value: "v1", label: "Original" }],
    value: "v1",
};

export const GameListContext = createContext<GameInfo[]>([]);
export const GameContext = createContext<GameInfo>(defaultGameInfo);
export const DataContext = createContext<any[]>([]);
export const SkillContext = createContext<CharacterSkillsList | null>(null);
export const SkillVersionContext =
    createContext<CharacterBuffs>(defaultCharacterBuff);
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

export function useSkillVersionContext() {
    return useContext(SkillVersionContext);
}

export function useSearchContext() {
    return useContext(SearchContext);
}
