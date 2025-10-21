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
        bossMat,
        localMat,
        gemstone1,
        gemstone2,
        gemstone3,
        gemstone4,
        commonMat1,
        commonMat2,
        commonMat3,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            characterXP1,
            characterXP2,
            characterXP3,
            bossMat,
            localMat,
            gemstone1,
            gemstone2,
            gemstone3,
            gemstone4,
            commonMat1,
            commonMat2,
            commonMat3,
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
        bossMat: {
            [mats(materials.bossMat).id]: bossMat,
        },
        localMat: {
            [mats(materials.localMat).id]: localMat,
        },
        gemstone: {
            [mats(`${materials.gemstone}1`).id]: gemstone1,
            [mats(`${materials.gemstone}2`).id]: gemstone2,
            [mats(`${materials.gemstone}3`).id]: gemstone3,
            [mats(`${materials.gemstone}4`).id]: gemstone4,
        },
        commonMat: {
            [mats(`${materials.commonMat}1`).id]: commonMat1,
            [mats(`${materials.commonMat}2`).id]: commonMat2,
            [mats(`${materials.commonMat}3`).id]: commonMat3,
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
        weeklyBossMat,
        crown,
        talentBook1,
        talentBook2,
        talentBook3,
        commonMat1,
        commonMat2,
        commonMat3,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            weeklyBossMat,
            crown,
            talentBook1,
            talentBook2,
            talentBook3,
            commonMat1,
            commonMat2,
            commonMat3,
        ] = calculateCosts(costs, start, stop);
    }

    return {
        credits: {
            202: credits,
        },
        weeklyBossMat: {
            [mats(materials.weeklyBossMat).id]: weeklyBossMat,
        },
        crown: {
            104319: crown,
        },
        talentBook: {
            [mats(`${materials.talentBook}1`).id]: talentBook1,
            [mats(`${materials.talentBook}2`).id]: talentBook2,
            [mats(`${materials.talentBook}3`).id]: talentBook3,
        },
        commonMat: {
            [mats(`${materials.commonMat}1`).id]: commonMat1,
            [mats(`${materials.commonMat}2`).id]: commonMat2,
            [mats(`${materials.commonMat}3`).id]: commonMat3,
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
        weaponAscensionMat1,
        weaponAscensionMat2,
        weaponAscensionMat3,
        weaponAscensionMat4,
        eliteMat1,
        eliteMat2,
        eliteMat3,
        commonMat1,
        commonMat2,
        commonMat3,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            weaponXP1,
            weaponXP2,
            weaponXP3,
            weaponAscensionMat1,
            weaponAscensionMat2,
            weaponAscensionMat3,
            weaponAscensionMat4,
            eliteMat1,
            eliteMat2,
            eliteMat3,
            commonMat1,
            commonMat2,
            commonMat3,
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
        weaponAscensionMat: {
            [mats(`${materials.weaponAscensionMat}1`).id]: weaponAscensionMat1,
            [mats(`${materials.weaponAscensionMat}2`).id]: weaponAscensionMat2,
            [mats(`${materials.weaponAscensionMat}3`).id]: weaponAscensionMat3,
            [mats(`${materials.weaponAscensionMat}4`).id]: weaponAscensionMat4,
        },
        eliteMat: {
            [mats(`${materials.eliteMat}1`).id]: eliteMat1,
            [mats(`${materials.eliteMat}2`).id]: eliteMat2,
            [mats(`${materials.eliteMat}3`).id]: eliteMat3,
        },
        commonMat: {
            [mats(`${materials.commonMat}1`).id]: commonMat1,
            [mats(`${materials.commonMat}2`).id]: commonMat2,
            [mats(`${materials.commonMat}3`).id]: commonMat3,
        },
    };
}
