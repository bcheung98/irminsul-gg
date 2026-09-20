import { objectKeys, range } from "@/utils";
import {
    characterLevel,
    characterMemosprite,
    characterSkill,
    characterTraceMainCosts,
    characterTraceMainCostsElation,
    characterTraceMainCostsRemembrance,
    characterTraceSmallCosts,
    characterTraceSmallCostsElation,
    characterTraceSmallCostsRemembrance,
    weaponLevel,
} from "@/data/hsr/levelUpCosts";
import { calculateCosts, createMaterialIdResolver } from "@/helpers/costs";
import { getHSRMaterialResolvers } from "./getMaterials";
import type { HSRMaterials } from "@/types/hsr/materials";
import type { HSRCharacterUnlockKeys } from "@/types/hsr/character";

const { getMaterial } = getHSRMaterialResolvers();
const materialId = createMaterialIdResolver(getMaterial);

interface GetLevelUpCostsProps {
    start?: number;
    stop?: number;
    selected?: boolean;
    withXP?: boolean;
    name?: string;
    weaponType?: string;
    rarity?: number;
    skillKey?: string;
    materials: HSRMaterials;
}

export function getCharacterLevelCost({
    start,
    stop,
    selected,
    name,
    rarity,
    withXP,
    materials,
}: Required<
    Pick<
        GetLevelUpCostsProps,
        | "start"
        | "stop"
        | "selected"
        | "name"
        | "rarity"
        | "withXP"
        | "materials"
    >
>) {
    const costs = { ...characterLevel(rarity, name) };
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
            2: credits,
        },
        characterXP: {
            211: characterXP1,
            212: characterXP2,
            213: characterXP3,
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
    weaponType,
    rarity,
    skillKey,
    materials,
}: Required<
    Pick<
        GetLevelUpCostsProps,
        | "start"
        | "stop"
        | "selected"
        | "weaponType"
        | "rarity"
        | "skillKey"
        | "materials"
    >
>) {
    const costs = { ...characterSkill(rarity, skillKey, weaponType) };
    let [
        credits,
        weekly,
        crown,
        calyx1,
        calyx2,
        calyx3,
        common1,
        common2,
        common3,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            weekly,
            crown,
            calyx1,
            calyx2,
            calyx3,
            common1,
            common2,
            common3,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            2: credits,
        },
        weekly: {
            [materialId(materials.weekly)]: weekly,
        },
        crown: {
            241: crown,
        },
        calyx: {
            [materialId(materials.calyx, 1)]: calyx1,
            [materialId(materials.calyx, 2)]: calyx2,
            [materialId(materials.calyx, 3)]: calyx3,
        },
        common: {
            [materialId(materials.common, 1)]: common1,
            [materialId(materials.common, 2)]: common2,
            [materialId(materials.common, 3)]: common3,
        },
    };
}

export function getCharacterMemosprite({
    start,
    stop,
    selected,
    rarity,
    materials,
}: Required<
    Pick<
        GetLevelUpCostsProps,
        "start" | "stop" | "selected" | "rarity" | "materials"
    >
>) {
    const costs = { ...characterMemosprite(rarity) };
    let [credits, calyx1, calyx2, calyx3, common1, common2, common3] = range(
        0,
        objectKeys(costs).length,
        0,
    );
    if (selected) {
        [credits, calyx1, calyx2, calyx3, common1, common2, common3] =
            calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            2: credits,
        },
        calyx: {
            [materialId(materials.calyx, 1)]: calyx1,
            [materialId(materials.calyx, 2)]: calyx2,
            [materialId(materials.calyx, 3)]: calyx3,
        },
        common: {
            [materialId(materials.common, 1)]: common1,
            [materialId(materials.common, 2)]: common2,
            [materialId(materials.common, 3)]: common3,
        },
    };
}

export function getCharacterTraceMain({
    skillKey,
    rarity,
    selected,
    weaponType,
    materials,
}: {
    skillKey: Extract<HSRCharacterUnlockKeys, "A2" | "A4" | "A6">;
    rarity: number;
    selected: boolean;
    weaponType: string;
    materials: HSRMaterials;
}) {
    let costs;
    switch (weaponType) {
        case "Remembrance":
            costs = { ...characterTraceMainCostsRemembrance[skillKey] };
            break;
        case "Elation":
            costs = { ...characterTraceMainCostsElation[skillKey] };
            break;
        default:
            costs = { ...characterTraceMainCosts[skillKey] };
            break;
    }
    const index = rarity - 4;
    let { credits, calyx1, calyx2, calyx3, weekly, crown } = costs;
    return {
        credits: {
            2: selected && credits ? credits[index] : 0,
        },
        weekly: {
            [materialId(materials.weekly)]:
                selected && weekly ? weekly[index] : 0,
        },
        crown: {
            241: selected && crown ? crown[index] : 0,
        },
        calyx: {
            [materialId(materials.calyx, 1)]:
                selected && calyx1 ? calyx1[index] : 0,
            [materialId(materials.calyx, 2)]:
                selected && calyx2 ? calyx2[index] : 0,
            [materialId(materials.calyx, 3)]:
                selected && calyx3 ? calyx3[index] : 0,
        },
    };
}

export function getCharacterTraceSmall({
    skillKey,
    rarity,
    selected,
    weaponType,
    materials,
}: {
    skillKey: HSRCharacterUnlockKeys;
    rarity: number;
    selected: boolean;
    weaponType: string;
    materials: HSRMaterials;
}) {
    let costs;
    switch (weaponType) {
        case "Remembrance":
            costs = { ...characterTraceSmallCostsRemembrance[skillKey] };
            break;
        case "Elation":
            costs = { ...characterTraceSmallCostsElation[skillKey] };
            break;
        default:
            costs = { ...characterTraceSmallCosts[skillKey] };
            break;
    }
    const index = rarity - 4;
    let { credits, calyx1, calyx2, calyx3, common1, common2, common3 } = costs;
    return {
        credits: {
            2: selected && credits ? credits[index] : 0,
        },
        calyx: {
            [materialId(materials.calyx, 1)]:
                selected && calyx1 ? calyx1[index] : 0,
            [materialId(materials.calyx, 2)]:
                selected && calyx2 ? calyx2[index] : 0,
            [materialId(materials.calyx, 3)]:
                selected && calyx3 ? calyx3[index] : 0,
        },
        common: {
            [materialId(materials.common, 1)]:
                selected && common1 ? common1[index] : 0,
            [materialId(materials.common, 2)]:
                selected && common2 ? common2[index] : 0,
            [materialId(materials.common, 3)]:
                selected && common3 ? common3[index] : 0,
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
        calyx1,
        calyx2,
        calyx3,
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
            calyx1,
            calyx2,
            calyx3,
            common1,
            common2,
            common3,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            2: credits,
        },
        weaponXP: {
            221: weaponXP1,
            222: weaponXP2,
            223: weaponXP3,
        },
        calyx: {
            [materialId(materials.calyx, 1)]: calyx1,
            [materialId(materials.calyx, 2)]: calyx2,
            [materialId(materials.calyx, 3)]: calyx3,
        },
        common: {
            [materialId(materials.common, 1)]: common1,
            [materialId(materials.common, 2)]: common2,
            [materialId(materials.common, 3)]: common3,
        },
    };
}
