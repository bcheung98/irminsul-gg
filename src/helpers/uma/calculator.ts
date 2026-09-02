import { sortBy } from "@/utils";
import { distances, strategies, terrain } from "@/data/uma/common";
import { badgeSpriteMap, ranks, sheetSize, statScores } from "@/data/uma/ranks";
import { UmaAptitude, UmaRank } from "@/types/uma";
import { DataArray, StatArray, UmaSkillOption } from "@/types/uma/calculator";
import { UmaCharacter, UmaCharacterAptitude } from "@/types/uma/character";
import { UmaSkill } from "@/types/uma/skill";

function getAptitudeMultipler(grade: UmaRank) {
    switch (grade) {
        case "S":
        case "A":
            return 1.1;
        case "B":
        case "C":
            return 0.9;
        case "D":
        case "E":
        case "F":
            return 0.8;
        default:
            return 0.7;
    }
}

function getScoreMultiplier(aptitudes: UmaAptitude[], multipliers: number[]) {
    let res = 1.0;
    if (
        aptitudes.every((apt) => terrain.includes(apt)) ||
        aptitudes.every((apt) => distances.includes(apt)) ||
        aptitudes.every((apt) => strategies.includes(apt))
    ) {
        res = Math.max(...multipliers);
    } else {
        res = multipliers.reduce((a, c) => a * c);
    }
    return res;
}

const valueOverrides: Record<number, number> = {
    300041: 0,
    1100011: -500,
    202141: -174,
    202181: -174,
};
const purpleSkillIcons = [
    10014, 10024, 10034, 10044, 10054, 20014, 20015, 20024, 20044, 20045, 20064,
];

function getBaseSkillRatingValue(skill: UmaSkillOption) {
    const value = Number(skill.values[0]);
    if (!Number.isFinite(value)) return value;
    if (value < 0) return value;

    if (skill.id in valueOverrides) {
        return valueOverrides[skill.id];
    }
    if (purpleSkillIcons.includes(skill.icon)) {
        if (value >= 100) return -262;
        if (value >= 70) return -174;
        if (value <= 0) return 0;
        return -129;
    }
    return value;
}

export function calculateUniqueLevelScore(
    starLevel: number,
    uniqueLevel: number,
) {
    return uniqueLevel * (starLevel < 3 ? 120 : 170);
}

export function calculateStatsScore(stats: DataArray) {
    return stats.slice(0, 5).map((i) => statScores[i], 0) as StatArray;
}

export function calculateSkillScore(
    aptitude: UmaCharacterAptitude,
    skill: UmaSkillOption,
) {
    if (!skill.values) {
        console.warn(
            `Could not compute score for skill ${skill.name || skill.nameJP || skill.nameJPNative}`,
        );
        return 0;
    }
    const checkType = skill.values[5];
    let score = getBaseSkillRatingValue(skill);
    if (checkType) {
        const aptitudeMatch = checkType.split("/") as UmaAptitude[];
        const multipliers: number[] = [];
        aptitudeMatch.forEach((apt) => {
            let aptRank = "";
            if (terrain.includes(apt)) {
                aptRank = aptitude.surface[apt.toLowerCase()];
            } else if (distances.includes(apt)) {
                aptRank = aptitude.distance[apt.toLowerCase()];
            } else if (strategies.includes(apt)) {
                aptRank = aptitude.strategy[apt.toLowerCase()];
            }
            multipliers.push(getAptitudeMultipler(aptRank as UmaRank));
        });
        score *= getScoreMultiplier(aptitudeMatch, multipliers);
    }
    return Math.round(score);
}

export function calculateTotalSkillScore(
    aptitude: UmaCharacterAptitude,
    skills: UmaSkillOption[],
    hidden: number[],
) {
    return skills.reduce((total, skill) => {
        let value = 0;
        if (!hidden.includes(skill.id)) {
            value = calculateSkillScore(aptitude, skill);
        }
        return total + value;
    }, 0);
}

export function calculateRank(score: number) {
    let rank: keyof typeof ranks = "G";
    let min = 0;
    for (const [nextRank, threshold] of Object.entries(ranks)) {
        if (score < threshold) {
            return { rank, min, nextRank, threshold };
        }
        rank = nextRank as keyof typeof ranks;
        min = threshold;
    }
    return { rank, min, nextRank: "G+", threshold: 300 };
}

export function getScore({
    aptitude,
    stats,
    skills,
    hiddenSkills,
}: {
    aptitude: UmaCharacterAptitude;
    stats: DataArray;
    skills: UmaSkillOption[];
    hiddenSkills: number[];
}) {
    let statsScore = [],
        uniqueScore = 0,
        skillScore = 0;
    statsScore = calculateStatsScore(stats);
    uniqueScore = calculateUniqueLevelScore(stats[5], stats[6]);
    skillScore = calculateTotalSkillScore(aptitude, skills, hiddenSkills);
    return { statsScore, uniqueScore, skillScore };
}

// NOTE: The following code block was adapated from daftuyda.moe's rating calculator
export function getRankBadge(rank: keyof typeof ranks, size = 88) {
    const badge = badgeSpriteMap[rank];
    const renderWidth = size;
    const renderHeight = size;
    const scale = Math.min(renderWidth / badge.w, renderHeight / badge.h);
    const scaledSpriteWidth = sheetSize.w * scale;
    const scaledSpriteHeight = sheetSize.h * scale;
    const scaledRectWidth = badge.w * scale;
    const scaledRectHeight = badge.h * scale;
    const offsetX = (renderWidth - scaledRectWidth) / 2 - badge.x * scale;
    const offsetY = (renderHeight - scaledRectHeight) / 2 - badge.y * scale;

    return {
        width: "100%",
        height: "100%",
        backgroundImage:
            "url(https://assets.irminsul.gg/v2/uma/ranks/Ranks.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: `${scaledSpriteWidth}px ${scaledSpriteHeight}px`,
        backgroundPosition: `${offsetX}px ${offsetY}px`,
    };
}

export function getUniqueSkill(
    characters: UmaCharacter[],
    charID: number | null,
    skills: UmaSkill[],
    stats: DataArray,
) {
    let skill = skills.filter((skill) => skill.unique === charID);
    const char = characters.find((char) => char.id === charID);
    if ((char?.rarity || 3) < 3) {
        skill = skill.filter(
            (skill) => skill.rarity === (stats[5] < 3 ? 3 : 4),
        );
    }
    return createSkillOptions(skill)[0];
}

export function createSkillOptions(skills: UmaSkill[]): UmaSkillOption[] {
    return skills.map((skill) => ({
        id: skill.id,
        name: skill.name.global,
        nameJP: skill.name.jp,
        nameJPNative: skill.name.jpNative,
        icon: skill.icon,
        rarity: skill.rarity,
        values: skill.values || [],
    }));
}

// Custom sort to emulate in-game sorting order
export function sortSkills(skills: UmaSkillOption[]) {
    const skillTypes: Record<string, UmaSkillOption[]> = {
        special: [],
        passives: [],
        greens: [],
        other: [],
    };

    skills.forEach((skill) => {
        // Unique skills
        if ([3, 4, 5].includes(skill.rarity)) {
            skillTypes.passives.push(skill);
        } // Special case for Runaway
        else if (skill.icon === 40012) {
            skillTypes.special.push(skill);
        }
        // Green skills with no aptitude requirement (excluding Lone Wolf, Sympathy, Lucky Seven, and Restraint)
        else if (
            ![201631, 201632, 201641, 202161].includes(skill.id) &&
            skill.icon < 10061 &&
            skill.values[5] === ""
        ) {
            skillTypes.greens.push(skill);
        }
        // Everything else
        else {
            skillTypes.other.push(skill);
        }
    });

    return Object.values(skillTypes)
        .map((item) => item.sort((a, b) => sortBy(b.id, a.id)))
        .flat();
}
