import { GameData } from "@/types";
import { CostArray, CostValue } from "@/types/costs";
import {
    getCharacterLevelCost,
    getCharacterSkillCost,
} from "./genshin/getLevelUpCosts";

interface Costs {
    [tag: string]: (args: any) => { [key: string]: CostValue };
}

export const costs: GameData<Costs> = {
    genshin: {
        characterLevel: getCharacterLevelCost,
        characterSkill: getCharacterSkillCost,
    },
};

export function calculateCosts(costs: CostArray, start: number, stop: number) {
    return Object.values(costs).map((arr) =>
        arr.slice(start, stop).reduce((a, c) => a + c)
    );
}
