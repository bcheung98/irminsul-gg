import { objectKeys, range } from "@/utils";
import {
    characterLevel,
    characterSkill,
    weaponLevel,
} from "@/data/genshin/levelUpCosts";
import { getGenshinMaterial } from "./getMaterials";
import { GenshinMaterials } from "@/types/genshin/materials";
import { calculateCosts } from "../costs";

const mats = getGenshinMaterial();

export interface GetLevelUpCostsProps {
    start?: number;
    stop?: number;
    selected?: boolean;
    withXP?: boolean;
    rarity?: number;
    materials: GenshinMaterials;
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
        local,
        gemstone1,
        gemstone2,
        gemstone3,
        gemstone4,
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
            local,
            gemstone1,
            gemstone2,
            gemstone3,
            gemstone4,
            common1,
            common2,
            common3,
        ] = calculateCosts(costs, start, stop);
    }

    return {
        credits: {
            202: credits,
        },
        characterXP: {
            104001: characterXP1,
            104002: characterXP2,
            104003: characterXP3,
        },
        boss: {
            [mats(materials.boss).id]: boss,
        },
        local: {
            [mats(materials.local).id]: local,
        },
        gemstone: {
            [mats(`${materials.gemstone}1`).id]: gemstone1,
            [mats(`${materials.gemstone}2`).id]: gemstone2,
            [mats(`${materials.gemstone}3`).id]: gemstone3,
            [mats(`${materials.gemstone}4`).id]: gemstone4,
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

    let [
        credits,
        weekly,
        crown,
        talent1,
        talent2,
        talent3,
        common1,
        common2,
        common3,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            weekly,
            crown,
            talent1,
            talent2,
            talent3,
            common1,
            common2,
            common3,
        ] = calculateCosts(costs, start, stop);
    }

    return {
        credits: {
            202: credits,
        },
        weekly: {
            [mats(materials.weekly).id]: weekly,
        },
        crown: {
            104319: crown,
        },
        talent: {
            [mats(`${materials.talent}1`).id]: talent1,
            [mats(`${materials.talent}2`).id]: talent2,
            [mats(`${materials.talent}3`).id]: talent3,
        },
        common: {
            [mats(`${materials.common}1`).id]: common1,
            [mats(`${materials.common}2`).id]: common2,
            [mats(`${materials.common}3`).id]: common3,
        },
    };
}

export function getWeaponLevelCost({
    start,
    stop,
    selected,
    withXP,
    rarity,
    materials,
}: Required<GetLevelUpCostsProps>) {
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
        weapon4,
        elite1,
        elite2,
        elite3,
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
            weapon4,
            elite1,
            elite2,
            elite3,
            common1,
            common2,
            common3,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            202: credits,
        },
        weaponXP: {
            104011: weaponXP1,
            104012: weaponXP2,
            104013: weaponXP3,
        },
        weapon: {
            [mats(`${materials.weapon}1`).id]: weapon1,
            [mats(`${materials.weapon}2`).id]: weapon2,
            [mats(`${materials.weapon}3`).id]: weapon3,
            [mats(`${materials.weapon}4`).id]: weapon4,
        },
        elite: {
            [mats(`${materials.elite}1`).id]: elite1,
            [mats(`${materials.elite}2`).id]: elite2,
            [mats(`${materials.elite}3`).id]: elite3,
        },
        common: {
            [mats(`${materials.common}1`).id]: common1,
            [mats(`${materials.common}2`).id]: common2,
            [mats(`${materials.common}3`).id]: common3,
        },
    };
}
