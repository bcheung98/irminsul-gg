import { GameData } from "@/types";
import { CostArray, CostValue } from "@/types/costs";
import {
    getCharacterLevelCost as getGenshinCharacterLevelCost,
    getCharacterSkillCost as getGenshinCharacterSkillCost,
    getWeaponLevelCost as getGenshinWeaponLevelCost,
} from "./genshin/getLevelUpCosts";
import {
    getCharacterLevelCost as getHSRCharacterLevelCost,
    getCharacterSkillCost as getHSRCharacterSkillCost,
    getWeaponLevelCost as getHSRWeaponLevelCost,
    getCharacterMemosprite as getHSRCharacterMemosprite,
    getCharacterTraceMain as getHSRCharacterTraceMain,
    getCharacterTraceSmall as getHSRCharacterTraceSmall,
} from "./hsr/getLevelUpCosts";
import {
    getCharacterLevelCost as getWuWaCharacterLevelCost,
    getCharacterSkillCost as getWuWaCharacterSkillCost,
    getCharacterPassiveCost as getWuWaCharacterPassiveCost,
    getCharacterBonusStatCost as getWuWaCharacterBonusStatCost,
    getWeaponLevelCost as getWuWaWeaponLevelCost,
} from "./wuwa/getLevelUpCosts";
import {
    getCharacterLevelCost as getZZZCharacterLevelCost,
    getCharacterSkillCost as getZZZCharacterSkillCost,
    getCharacterCoreSkillCost as getZZZCharacterCoreSkillCost,
    getWeaponLevelCost as getZZZWeaponLevelCost,
} from "./zzz/getLevelUpCosts";
import {
    getCharacterLevelCost as getEndfieldCharacterLevelCost,
    getCharacterSkillCost as getEndfieldCharacterSkillCost,
    getWeaponLevelCost as getEndfieldWeaponLevelCost,
} from "./endfield/getLevelUpCosts";

interface Costs {
    [tag: string]: (arg0: any) => { [key: string]: CostValue };
}

export const costs: GameData<Costs> = {
    genshin: {
        characterLevel: getGenshinCharacterLevelCost,
        characterSkill: getGenshinCharacterSkillCost,
        weaponLevel: getGenshinWeaponLevelCost,
    },
    hsr: {
        characterLevel: getHSRCharacterLevelCost,
        characterSkill: getHSRCharacterSkillCost,
        characterMemosprite: getHSRCharacterMemosprite,
        characterTraceMain: getHSRCharacterTraceMain,
        characterTraceSmall: getHSRCharacterTraceSmall,
        weaponLevel: getHSRWeaponLevelCost,
    },
    wuwa: {
        characterLevel: getWuWaCharacterLevelCost,
        characterSkill: getWuWaCharacterSkillCost,
        characterPassive: getWuWaCharacterPassiveCost,
        characterBonusStat: getWuWaCharacterBonusStatCost,
        weaponLevel: getWuWaWeaponLevelCost,
    },
    zzz: {
        characterLevel: getZZZCharacterLevelCost,
        characterSkill: getZZZCharacterSkillCost,
        characterCoreSkill: getZZZCharacterCoreSkillCost,
        weaponLevel: getZZZWeaponLevelCost,
    },
    uma: {},
    endfield: {
        characterLevel: getEndfieldCharacterLevelCost,
        characterSkill: getEndfieldCharacterSkillCost,
        weaponLevel: getEndfieldWeaponLevelCost,
    },
};

export function calculateCosts(costs: CostArray, start: number, stop: number) {
    return Object.values(costs).map((arr) =>
        arr.slice(start, stop).reduce((a, c) => a + c),
    );
}
