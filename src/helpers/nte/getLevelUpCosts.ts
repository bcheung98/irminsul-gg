import { objectKeys, range } from "@/utils";
import {
    characterLevel,
    characterSkill,
    characterPassive,
    characterLifeSkill,
    weaponLevel,
} from "@/data/nte/levelUpCosts";
import { getNTEMaterial } from "./getMaterials";
import { NTEMaterials } from "@/types/nte/materials";
import { calculateCosts } from "../costs";

const mats = getNTEMaterial();

export interface GetLevelUpCostsProps {
    start?: number;
    stop?: number;
    selected?: boolean;
    withXP?: boolean;
    rarity?: number;
    materials: NTEMaterials;
    skillKey?: string;
}

export function getCharacterLevelCost({
    start,
    stop,
    selected,
    withXP,
    materials,
}: Required<
    Pick<
        GetLevelUpCostsProps,
        "start" | "stop" | "selected" | "withXP" | "materials"
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
        boss,
        common1,
        common2,
        common3,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            characterXP1,
            characterXP2,
            characterXP3,
            boss,
            common1,
            common2,
            common3,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            Gold: credits,
        },
        characterXP: {
            CharacterUpMaterial_lv1: characterXP1,
            CharacterUpMaterial_lv2: characterXP2,
            CharacterUpMaterial_lv3: characterXP3,
        },
        boss: {
            [mats(materials.boss).id]: boss,
        },
        common: {
            [mats(`${materials.common}1`).id]: common1,
            [mats(`${materials.common}2`).id]: common2,
            [mats(`${materials.common}3`).id]: common3,
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

    let [credits, weekly, skill1, skill2, skill3, common1, common2, common3] =
        range(0, objectKeys(costs).length, 0);
    if (selected) {
        [credits, weekly, skill1, skill2, skill3, common1, common2, common3] =
            calculateCosts(costs, start, stop);
    }

    return {
        credits: {
            Gold: credits,
        },
        weekly: {
            [mats(materials.weekly).id]: weekly,
        },
        skill: {
            [mats(`${materials.skill}1`).id]: skill1,
            [mats(`${materials.skill}2`).id]: skill2,
            [mats(`${materials.skill}3`).id]: skill3,
        },
        common: {
            [mats(`${materials.common}1`).id]: common1,
            [mats(`${materials.common}2`).id]: common2,
            [mats(`${materials.common}3`).id]: common3,
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
    let { credits, common2, common3, weekly } = costs;
    return {
        credits: {
            Gold: selected && credits ? credits : 0,
        },
        weekly: {
            [mats(materials.weekly).id]: selected && weekly ? weekly : 0,
        },
        common: {
            [mats(`${materials.common}1`).id]: 0,
            [mats(`${materials.common}2`).id]:
                selected && common2 ? common2 : 0,
            [mats(`${materials.common}3`).id]:
                selected && common3 ? common3 : 0,
        },
    };
}

export function getCharacterLifeSkillCost({
    start,
    stop,
    selected,
}: Required<Pick<GetLevelUpCostsProps, "start" | "stop" | "selected">>) {
    const costs = { ...characterLifeSkill };

    let [credits, city] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [credits, city] = calculateCosts(costs, start, stop);
    }

    return {
        credits: {
            Fons: credits,
        },
        city: {
            CityAbility_UpMaterial: city,
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
        weapon1,
        weapon2,
        weapon3,
        common1,
        common2,
        common3,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            weaponXP1,
            weaponXP2,
            weaponXP3,
            weapon1,
            weapon2,
            weapon3,
            common1,
            common2,
            common3,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            Gold: credits,
        },
        weaponXP: {
            WeaponUpMaterial_lv1: weaponXP1,
            WeaponUpMaterial_lv2: weaponXP2,
            WeaponUpMaterial_lv3: weaponXP3,
        },
        weapon: {
            [mats(`${materials.weapon}1`).id]: weapon1,
            [mats(`${materials.weapon}2`).id]: weapon2,
            [mats(`${materials.weapon}3`).id]: weapon3,
        },
        common: {
            [mats(`${materials.common}1`).id]: common1,
            [mats(`${materials.common}2`).id]: common2,
            [mats(`${materials.common}3`).id]: common3,
        },
    };
}
