import { objectKeys, range } from "@/utils";
import {
    characterBonusStat,
    characterLevel,
    characterPassive,
    characterSkill,
    weaponLevel,
} from "@/data/wuwa/levelUpCosts";
import { calculateCosts, createMaterialIdResolver } from "@/helpers/costs";
import { getWuWaMaterialResolvers } from "./getMaterials";
import type { WuWaMaterials } from "@/types/wuwa/materials";

const { getMaterial } = getWuWaMaterialResolvers();
const materialId = createMaterialIdResolver(getMaterial);

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
            [materialId(materials.boss)]: boss,
        },
        local: {
            [materialId(materials.local)]: local,
        },
        common: {
            [materialId(materials.common, 1)]: common1,
            [materialId(materials.common, 2)]: common2,
            [materialId(materials.common, 3)]: common3,
            [materialId(materials.common, 4)]: common4,
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
            [materialId(materials.weekly)]: weekly,
        },
        forgery: {
            [materialId(materials.forgery, 1)]: forgery1,
            [materialId(materials.forgery, 2)]: forgery2,
            [materialId(materials.forgery, 3)]: forgery3,
            [materialId(materials.forgery, 4)]: forgery4,
        },
        common: {
            [materialId(materials.common, 1)]: common1,
            [materialId(materials.common, 2)]: common2,
            [materialId(materials.common, 3)]: common3,
            [materialId(materials.common, 4)]: common4,
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
            [materialId(materials.weekly)]: selected && weekly ? weekly : 0,
        },
        forgery: {
            [materialId(materials.forgery, 1)]: 0,
            [materialId(materials.forgery, 2)]:
                selected && forgery2 ? forgery2 : 0,
            [materialId(materials.forgery, 3)]:
                selected && forgery3 ? forgery3 : 0,
            [materialId(materials.forgery, 4)]: 0,
        },
        common: {
            [materialId(materials.common, 1)]: 0,
            [materialId(materials.common, 2)]:
                selected && common2 ? common2 : 0,
            [materialId(materials.common, 3)]:
                selected && common3 ? common3 : 0,
            [materialId(materials.common, 4)]: 0,
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
            [materialId(materials.weekly)]: selected && weekly ? weekly : 0,
        },
        forgery: {
            [materialId(materials.forgery, 1)]: 0,
            [materialId(materials.forgery, 2)]: 0,
            [materialId(materials.forgery, 3)]:
                selected && forgery3 ? forgery3 : 0,
            [materialId(materials.forgery, 4)]:
                selected && forgery4 ? forgery4 : 0,
        },
        common: {
            [materialId(materials.common, 1)]: 0,
            [materialId(materials.common, 2)]: 0,
            [materialId(materials.common, 3)]:
                selected && common3 ? common3 : 0,
            [materialId(materials.common, 4)]:
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
            [materialId(materials.forgery, 1)]: forgery1,
            [materialId(materials.forgery, 2)]: forgery2,
            [materialId(materials.forgery, 3)]: forgery3,
            [materialId(materials.forgery, 4)]: forgery4,
        },
        common: {
            [materialId(materials.common, 1)]: common1,
            [materialId(materials.common, 2)]: common2,
            [materialId(materials.common, 3)]: common3,
            [materialId(materials.common, 4)]: common4,
        },
    };
}
