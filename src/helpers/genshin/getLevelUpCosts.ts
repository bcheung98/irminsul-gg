import { objectKeys, range } from "@/utils";
import {
    characterLevel,
    characterSkill,
    characterSkillTraveler,
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
    skillKey?: string;
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
            [mats(materials.boss).id]: mats(materials.boss).id ? boss : 0,
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

const travelerTalentMatIndex: Record<string, number[]> = {
    Mondstadt: [104301, 104301],
    Liyue: [104301, 104310],
    Inazuma: [104320, 104320],
    Sumeru: [104329, 104329],
    Fontaine: [104338, 104338],
    Natlan: [104347, 104347],
    "Nod-Krai": [104356, 104356],
    Snezhnaya: [104365, 104365],
};

const travelerCommonMatIndex: Record<string, [string, string]> = {
    Mondstadt: ["Scroll", "Scroll"],
    Liyue: ["Scroll", "Arrow"],
    Inazuma: ["Handguard", "Handguard"],
    Sumeru: ["Fungi", "Fungi"],
    Fontaine: ["Aberrant", "Aberrant"],
    Natlan: ["Whistle", "Whistle"],
    Snezhnaya: ["Chimera", "Chimera"],
};

const travelerWeeklyMatIndex: Record<string, [string, string]> = {
    Mondstadt: ["Dvalin's Sigh", "Dvalin's Sigh"],
    Liyue: ["Dvalin's Sigh", "Tail of Boreas"],
    Inazuma: ["Dragon Lord's Crown", "Dragon Lord's Crown"],
    Sumeru: ["Mudra of the Malefic General", "Mudra of the Malefic General"],
    Fontaine: ["Worldspan Fern", "Worldspan Fern"],
    Natlan: [
        "The Cornerstone of Stars and Flames",
        "The Cornerstone of Stars and Flames",
    ],
    Snezhnaya: ["Ascended Sample Queen", "Ascended Sample Queen"],
};

export function getCharacterSkillCost({
    start,
    stop,
    selected,
    skillKey,
    materials,
}: Required<
    Pick<
        GetLevelUpCostsProps,
        "start" | "stop" | "selected" | "skillKey" | "materials"
    >
>) {
    if (materials.boss === "*") {
        const index = skillKey === "attack" ? 0 : 1;
        const costs = { ...characterSkillTraveler(`${materials.talent}`) };
        let [
            credits,
            weekly,
            crown,
            talentA1,
            talentA2,
            talentA3,
            talentB1,
            talentB2,
            talentB3,
            talentC1,
            talentC2,
            talentC3,
            common1,
            common2,
            common3,
        ] = range(0, objectKeys(costs).length, 0);
        if (selected) {
            [
                credits,
                weekly,
                crown,
                talentA1,
                talentA2,
                talentA3,
                talentB1,
                talentB2,
                talentB3,
                talentC1,
                talentC2,
                talentC3,
                common1,
                common2,
                common3,
            ] = calculateCosts(costs, start, stop);
        }

        const talent: {
            [x: string]: number;
        } = {};

        [
            talentA1,
            talentB1,
            talentC1,
            talentA2,
            talentB2,
            talentC2,
            talentA3,
            talentB3,
            talentC3,
        ].forEach((mat, i) => {
            talent[`${travelerTalentMatIndex[materials.talent][index] + i}`] =
                mat;
        });

        return {
            credits: {
                202: credits,
            },
            weekly: {
                [mats(travelerWeeklyMatIndex[materials.talent][index]).id]:
                    weekly,
            },
            crown: {
                104319: crown,
            },
            talent,
            common: {
                [mats(`${travelerCommonMatIndex[materials.talent][index]}1`)
                    .id]: common1,
                [mats(`${travelerCommonMatIndex[materials.talent][index]}2`)
                    .id]: common2,
                [mats(`${travelerCommonMatIndex[materials.talent][index]}3`)
                    .id]: common3,
            },
        };
    } else {
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
