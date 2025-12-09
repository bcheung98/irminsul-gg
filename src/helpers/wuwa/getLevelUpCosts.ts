import { objectKeys, range } from "@/utils";
import {
    characterBonusStat,
    characterLevel,
    characterPassive,
    characterSkill,
    weaponLevel,
} from "@/data/wuwa/levelUpCosts";
import { getWuWaMaterial } from "./getMaterials";
import { WuWaMaterials } from "@/types/wuwa/materials";
import { calculateCosts } from "../costs";

const mats = getWuWaMaterial();

export interface GetLevelUpCostsProps {
    start?: number;
    stop?: number;
    selected?: boolean;
    withXP?: boolean;
    name?: string;
    rarity?: number;
    materials: WuWaMaterials;
    skillKey?: string;
}

export function getCharacterLevelCost({
    start,
    stop,
    selected,
    name,
    withXP,
    materials,
}: Required<
    Pick<
        GetLevelUpCostsProps,
        "start" | "stop" | "selected" | "name" | "withXP" | "materials"
    >
>) {
    const costs = { ...characterLevel(name) };
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
        characterXP4,
        boss,
        local,
        common1,
        common2,
        common3,
        common4,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            characterXP1,
            characterXP2,
            characterXP3,
            characterXP4,
            boss,
            local,
            common1,
            common2,
            common3,
            common4,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            2: credits,
        },
        characterXP: {
            43010001: characterXP1,
            43010002: characterXP2,
            43010003: characterXP3,
            43010004: characterXP4,
        },
        boss: {
            [mats(materials.boss).id]: boss,
        },
        local: {
            [mats(materials.local).id]: local,
        },
        common: {
            [mats(`${materials.common}1`).id]: common1,
            [mats(`${materials.common}2`).id]: common2,
            [mats(`${materials.common}3`).id]: common3,
            [mats(`${materials.common}4`).id]: common4,
        },
    };
}

export function getCharacterSkillCost({
    start,
    stop,
    selected,
    materials,
}: Required<
    Pick<GetLevelUpCostsProps, "start" | "stop" | "selected" | "materials">
>) {
    const costs = { ...characterSkill };
    let [
        credits,
        weekly,
        forgery1,
        forgery2,
        forgery3,
        forgery4,
        common1,
        common2,
        common3,
        common4,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            weekly,
            forgery1,
            forgery2,
            forgery3,
            forgery4,
            common1,
            common2,
            common3,
            common4,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            2: credits,
        },
        weekly: {
            [mats(materials.weekly).id]: weekly,
        },
        forgery: {
            [mats(`${materials.forgery}1`).id]: forgery1,
            [mats(`${materials.forgery}2`).id]: forgery2,
            [mats(`${materials.forgery}3`).id]: forgery3,
            [mats(`${materials.forgery}4`).id]: forgery4,
        },
        common: {
            [mats(`${materials.common}1`).id]: common1,
            [mats(`${materials.common}2`).id]: common2,
            [mats(`${materials.common}3`).id]: common3,
            [mats(`${materials.common}4`).id]: common4,
        },
    };
}

export function getCharacterPassiveCost({
    skillKey,
    selected,
    materials,
}: Required<
    Pick<GetLevelUpCostsProps, "skillKey" | "selected" | "materials">
>) {
    const costs = { ...characterPassive[Number(skillKey) - 1] };
    let { credits, forgery2, common2, forgery3, common3, weekly } = costs;
    return {
        credits: {
            2: selected && credits ? credits : 0,
        },
        weekly: {
            [mats(materials.weekly).id]: selected && weekly ? weekly : 0,
        },
        forgery: {
            [mats(`${materials.forgery}1`).id]: 0,
            [mats(`${materials.forgery}2`).id]:
                selected && forgery2 ? forgery2 : 0,
            [mats(`${materials.forgery}3`).id]:
                selected && forgery3 ? forgery3 : 0,
            [mats(`${materials.forgery}4`).id]: 0,
        },
        common: {
            [mats(`${materials.common}1`).id]: 0,
            [mats(`${materials.common}2`).id]:
                selected && common2 ? common2 : 0,
            [mats(`${materials.common}3`).id]:
                selected && common3 ? common3 : 0,
            [mats(`${materials.common}4`).id]: 0,
        },
    };
}

export function getCharacterBonusStatCost({
    skillKey,
    selected,
    materials,
}: Required<
    Pick<GetLevelUpCostsProps, "skillKey" | "selected" | "materials">
>) {
    const costs = { ...characterBonusStat[Number(skillKey) - 1] };
    let { credits, forgery3, common3, forgery4, common4, weekly } = costs;
    return {
        credits: {
            2: selected && credits ? credits : 0,
        },
        weekly: {
            [mats(materials.weekly).id]: selected && weekly ? weekly : 0,
        },
        forgery: {
            [mats(`${materials.forgery}1`).id]: 0,
            [mats(`${materials.forgery}2`).id]: 0,
            [mats(`${materials.forgery}3`).id]:
                selected && forgery3 ? forgery3 : 0,
            [mats(`${materials.forgery}4`).id]:
                selected && forgery4 ? forgery4 : 0,
        },
        common: {
            [mats(`${materials.common}1`).id]: 0,
            [mats(`${materials.common}2`).id]: 0,
            [mats(`${materials.common}3`).id]:
                selected && common3 ? common3 : 0,
            [mats(`${materials.common}4`).id]:
                selected && common4 ? common4 : 0,
        },
    };
}

export function getWeaponLevelCost({
    start,
    stop,
    selected,
    rarity,
    withXP,
    materials,
}: Required<
    Pick<
        GetLevelUpCostsProps,
        "start" | "stop" | "selected" | "rarity" | "withXP" | "materials"
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
        weaponXP4,
        forgery1,
        forgery2,
        forgery3,
        forgery4,
        common1,
        common2,
        common3,
        common4,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            weaponXP1,
            weaponXP2,
            weaponXP3,
            weaponXP4,
            forgery1,
            forgery2,
            forgery3,
            forgery4,
            common1,
            common2,
            common3,
            common4,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            2: credits,
        },
        weaponXP: {
            43020001: weaponXP1,
            43020002: weaponXP2,
            43020003: weaponXP3,
            43020004: weaponXP4,
        },
        forgery: {
            [mats(`${materials.forgery}1`).id]: forgery1,
            [mats(`${materials.forgery}2`).id]: forgery2,
            [mats(`${materials.forgery}3`).id]: forgery3,
            [mats(`${materials.forgery}4`).id]: forgery4,
        },
        common: {
            [mats(`${materials.common}1`).id]: common1,
            [mats(`${materials.common}2`).id]: common2,
            [mats(`${materials.common}3`).id]: common3,
            [mats(`${materials.common}4`).id]: common4,
        },
    };
}
