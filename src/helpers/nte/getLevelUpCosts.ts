import { objectKeys, range } from "@/utils";
import {
    characterLevel,
    characterSkill,
    characterPassive,
    characterLifeSkill,
    weaponLevel,
} from "@/data/nte/levelUpCosts";
import { calculateCosts, createMaterialIdResolver } from "@/helpers/costs";
import { getNTEMaterialResolvers } from "./getMaterials";
import type { NTEMaterials } from "@/types/nte/materials";

const { getMaterial } = getNTEMaterialResolvers();
const materialId = createMaterialIdResolver(getMaterial);

export interface GetLevelUpCostsProps {
    start?: number;
    stop?: number;
    selected?: boolean;
    withXP?: boolean;
    rarity?: number;
    materials: NTEMaterials;
    skillKey?: string;
    length?: number;
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
            [materialId(materials.boss)]: boss,
        },
        common: {
            [materialId(materials.common, 1)]: common1,
            [materialId(materials.common, 2)]: common2,
            [materialId(materials.common, 3)]: common3,
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
            [materialId(materials.weekly)]: weekly,
        },
        skill: {
            [materialId(materials.skill, 1)]: skill1,
            [materialId(materials.skill, 2)]: skill2,
            [materialId(materials.skill, 3)]: skill3,
        },
        common: {
            [materialId(materials.common, 1)]: common1,
            [materialId(materials.common, 2)]: common2,
            [materialId(materials.common, 3)]: common3,
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
    const index = Number(skillKey.slice(-1)[0]) - 1;
    const costs = { ...characterPassive[index] };
    let { credits, common2, common3, weekly } = costs;
    return {
        credits: {
            Gold: selected && credits ? credits : 0,
        },
        weekly: {
            [materialId(materials.weekly)]: selected && weekly ? weekly : 0,
        },
        common: {
            [materialId(materials.common, 1)]: 0,
            [materialId(materials.common, 2)]:
                selected && common2 ? common2 : 0,
            [materialId(materials.common, 3)]:
                selected && common3 ? common3 : 0,
        },
    };
}

export function getCharacterLifeSkillCost({
    start,
    stop,
    selected,
    length,
}: Required<
    Pick<GetLevelUpCostsProps, "start" | "stop" | "selected" | "length">
>) {
    const costs = { ...characterLifeSkill(length) };
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
            [materialId(materials.weapon, 1)]: weapon1,
            [materialId(materials.weapon, 2)]: weapon2,
            [materialId(materials.weapon, 3)]: weapon3,
        },
        common: {
            [materialId(materials.common, 1)]: common1,
            [materialId(materials.common, 2)]: common2,
            [materialId(materials.common, 3)]: common3,
        },
    };
}
