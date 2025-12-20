import { objectKeys, range } from "@/utils";
import {
    characterLevel,
    characterSkill,
    characterCoreSkill,
    weaponLevel,
} from "@/data/zzz/levelUpCosts";
import { getZZZMaterial } from "./getMaterials";
import { ZZZElement, ZZZRarity, ZZZWeaponType } from "@/types/zzz";
import { ZZZMaterials } from "@/types/zzz/materials";
import { calculateCosts } from "../costs";

const mats = getZZZMaterial();

export interface GetLevelUpCostsProps {
    start?: number;
    stop?: number;
    selected?: boolean;
    withXP?: boolean;
    rarity?: ZZZRarity;
    element?: ZZZElement;
    weaponType?: ZZZWeaponType;
    materials?: ZZZMaterials;
}

export function getCharacterLevelCost({
    start,
    stop,
    selected,
    withXP,
    weaponType,
}: Required<
    Pick<
        GetLevelUpCostsProps,
        "start" | "stop" | "selected" | "withXP" | "weaponType"
    >
>) {
    const costs = { ...characterLevel };
    if (!withXP) {
        objectKeys(costs).forEach((material) => {
            costs[material] = costs[material]
                .map((value, index) => (index % 2 === 0 ? value : -1))
                .filter((i) => (i! -= -1));
        });
    }
    let [
        credits,
        characterXP1,
        characterXP2,
        characterXP3,
        characterLevel1,
        characterLevel2,
        characterLevel3,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            characterXP1,
            characterXP2,
            characterXP3,
            characterLevel1,
            characterLevel2,
            characterLevel3,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            10: credits,
        },
        characterXP: {
            300001: characterXP1,
            300002: characterXP2,
            300003: characterXP3,
        },
        characterLevel: {
            [mats(`Character${weaponType}1`).id]: characterLevel1,
            [mats(`Character${weaponType}2`).id]: characterLevel2,
            [mats(`Character${weaponType}3`).id]: characterLevel3,
        },
    };
}

export function getCharacterSkillCost({
    start,
    stop,
    selected,
    element,
    materials,
}: Required<
    Pick<
        GetLevelUpCostsProps,
        "start" | "stop" | "selected" | "element" | "materials"
    >
>) {
    const costs = { ...characterSkill };
    let [credits, characterSkill1, characterSkill2, characterSkill3, crown] =
        range(0, objectKeys(costs).length, 0);
    if (selected) {
        [credits, characterSkill1, characterSkill2, characterSkill3, crown] =
            calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            10: credits,
        },
        characterSkill: {
            [mats(`${element}1`).id]: characterSkill1,
            [mats(`${element}2`).id]: characterSkill2,
            [mats(`${element}3`).id]: characterSkill3,
        },
        crown: { 100941: crown },
    };
}

export function getCharacterCoreSkillCost({
    start,
    stop,
    selected,
    materials,
}: Required<
    Pick<GetLevelUpCostsProps, "start" | "stop" | "selected" | "materials">
>) {
    const costs = { ...characterCoreSkill };
    let [credits, boss, weekly] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [credits, boss, weekly] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            10: credits,
        },
        boss: {
            [mats(materials.boss).id]: boss,
        },
        weekly: {
            [mats(materials.weekly).id]: weekly,
        },
    };
}

export function getWeaponLevelCost({
    start,
    stop,
    selected,
    withXP,
    weaponType,
    rarity,
}: Required<
    Pick<
        GetLevelUpCostsProps,
        "start" | "stop" | "selected" | "withXP" | "weaponType" | "rarity"
    >
>) {
    const costs = { ...weaponLevel(rarity) };
    if (!withXP) {
        objectKeys(costs).forEach((material) => {
            costs[material] = costs[material]
                .map((value, index) => (index % 2 === 0 ? value : -1))
                .filter((i) => (i! -= -1));
        });
    }
    let [
        credits,
        weaponXP1,
        weaponXP2,
        weaponXP3,
        weaponLevel1,
        weaponLevel2,
        weaponLevel3,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            weaponXP1,
            weaponXP2,
            weaponXP3,
            weaponLevel1,
            weaponLevel2,
            weaponLevel3,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            10: credits,
        },
        weaponXP: {
            301001: weaponXP1,
            301002: weaponXP2,
            301003: weaponXP3,
        },
        weaponLevel: {
            [mats(`Weapon${weaponType}1`).id]: weaponLevel1,
            [mats(`Weapon${weaponType}2`).id]: weaponLevel2,
            [mats(`Weapon${weaponType}3`).id]: weaponLevel3,
        },
    };
}
