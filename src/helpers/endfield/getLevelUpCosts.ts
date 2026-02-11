import { objectKeys, range } from "@/utils";
import {
    characterAttribute,
    characterBaseSkill,
    characterLevel,
    characterOutfitting,
    characterPassives,
    characterSkill,
    weaponLevel,
} from "@/data/endfield/levelUpCosts";
import { getEndfieldMaterial } from "./getMaterials";
import { EndfieldMaterials } from "@/types/endfield/materials";
import { calculateCosts } from "../costs";
import { EndfieldCharacterPassive } from "@/types/endfield/character";

const mats = getEndfieldMaterial();

export interface GetLevelUpCostsProps {
    start?: number;
    stop?: number;
    selected?: boolean;
    withXP?: boolean;
    name?: string;
    rarity?: number;
    materials: EndfieldMaterials;
    skillKey?: string;
    baseSkills?: EndfieldCharacterPassive[];
    talents?: EndfieldCharacterPassive[];
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
        characterXP4,
        characterXP5,
        disk1,
        disk2,
        fungi1,
        fungi2,
        fungi3,
        fungi4,
        level,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            characterXP1,
            characterXP2,
            characterXP3,
            characterXP4,
            characterXP5,
            disk1,
            disk2,
            fungi1,
            fungi2,
            fungi3,
            fungi4,
            level,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            item_gold: credits,
        },
        characterXP: {
            item_expcard_stage1_low: characterXP1,
            item_expcard_stage1_mid: characterXP2,
            item_expcard_stage1_high: characterXP3,
            item_expcard_stage2_low: characterXP4,
            item_expcard_stage2_high: characterXP5,
        },
        disk: {
            item_char_break_stage_1_2: disk1,
            item_char_break_stage_3_4: disk2,
        },
        fungi: {
            item_plant_mushroom_1_1: fungi1,
            item_plant_mushroom_1_2: fungi2,
            item_plant_mushroom_1_3: fungi3,
            [mats(materials.fungi).id]: fungi4,
        },
        rare: {
            [mats(materials.level).id]: level,
        },
    };
}

export function getCharacterSkillCost({
    start,
    stop,
    selected,
    materials,
    skillKey,
}: Required<
    Pick<
        GetLevelUpCostsProps,
        "start" | "stop" | "selected" | "materials" | "skillKey"
    >
>) {
    const costs = { ...characterSkill };
    let [
        credits,
        prism1,
        prism2,
        plant1,
        plant2,
        plant3,
        plant4,
        skill,
        crown,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            prism1,
            prism2,
            plant1,
            plant2,
            plant3,
            plant4,
            skill,
            crown,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            item_gold: credits,
        },
        crown: {
            item_char_skill_crown: crown,
        },
        prism: {
            item_char_skill_level_1_6: prism1,
            item_char_skill_level_7_12: prism2,
        },
        plant: {
            item_plant_crylplant_1_1: plant1,
            item_plant_crylplant_1_2: plant2,
            item_plant_crylplant_1_3: plant3,
            [mats(materials.plant).id]: plant4,
        },
        rare: {
            [mats(materials["skillA"]).id]: ["attack", "combo"].includes(
                skillKey,
            )
                ? skill
                : 0,
            [mats(materials["skillB"]).id]: ["skill", "ultimate"].includes(
                skillKey,
            )
                ? skill
                : 0,
        },
    };
}

export function getCharacterAttributeCost({
    skillKey,
    selected,
}: Required<Pick<GetLevelUpCostsProps, "skillKey" | "selected">>) {
    const index = Number(skillKey.slice(-1)[0]) - 1;
    const costs = { ...characterAttribute };
    let { credits, prism1, prism2 } = costs;
    return {
        credits: {
            item_gold: selected ? credits[index] : 0,
        },
        prism: {
            item_char_skill_level_1_6: selected ? prism1[index] : 0,
            item_char_skill_level_7_12: selected ? prism2[index] : 0,
        },
    };
}

export function getCharacterTalentCost({
    skillKey,
    selected,
    talents,
}: Required<Pick<GetLevelUpCostsProps, "skillKey" | "selected" | "talents">>) {
    const levels = talents
        .map((skill) => skill.levels.filter((i) => i != 0))
        .flat();
    const index = Number(skillKey.slice(-1)[0]) - 1;
    const costs = characterPassives(levels);
    let { credits, prism1, prism2 } = costs;
    return {
        credits: {
            item_gold: selected ? credits[index] : 0,
        },
        prism: {
            item_char_skill_level_1_6: selected ? prism1[index] : 0,
            item_char_skill_level_7_12: selected ? prism2[index] : 0,
        },
    };
}

export function getCharacterBaseSkillCost({
    skillKey,
    selected,
}: Required<Pick<GetLevelUpCostsProps, "skillKey" | "selected">>) {
    const index = Number(skillKey.slice(-1)[0]) - 1;
    const costs = { ...characterBaseSkill[index < 2 ? 0 : 1] };
    let { credits, prism1, prism2 } = costs;

    return {
        credits: {
            item_gold: selected ? credits[index % 2] : 0,
        },
        prism: {
            item_char_skill_level_1_6: selected ? prism1[index % 2] : 0,
            item_char_skill_level_7_12: selected ? prism2[index % 2] : 0,
        },
    };
}

export function getCharacterOutfittingCost({
    skillKey,
    selected,
}: Required<Pick<GetLevelUpCostsProps, "skillKey" | "selected">>) {
    const index = Number(skillKey.slice(-1)[0]) - 1;
    const costs = { ...characterOutfitting };
    let { credits } = costs;
    return {
        credits: {
            item_gold: selected ? credits[index] : 0,
        },
    };
}

export function getWeaponLevelCost({
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
    const costs = { ...weaponLevel };
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
        dice1,
        dice2,
        mineral1,
        mineral2,
        mineral3,
        mineral4,
        level,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            weaponXP1,
            weaponXP2,
            weaponXP3,
            dice1,
            dice2,
            mineral1,
            mineral2,
            mineral3,
            mineral4,
            level,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            item_gold: credits,
        },
        weaponXP: {
            item_weapon_expcard_low: weaponXP1,
            item_weapon_expcard_mid: weaponXP2,
            item_weapon_expcard_high: weaponXP3,
        },
        dice: {
            item_weapon_break_low: dice1,
            item_weapon_break_high: dice2,
        },
        mineral: {
            item_plant_spcstone_1_1: mineral1,
            item_plant_spcstone_1_2: mineral2,
            item_plant_spcstone_1_3: mineral3,
            [mats(materials.mineral).id]: mineral4,
        },
        rare: {
            [mats(materials.level).id]: level,
        },
    };
}
