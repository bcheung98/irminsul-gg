import { distances, strategies, terrain } from "@/data/uma/common";
import { badgeSpriteMap, ranks, sheetSize, statScores } from "@/data/uma/ranks";
import { UmaAptitude, UmaRank } from "@/types/uma";
import { DataArray, StatArray, UmaSkillOption } from "@/types/uma/calculator";
import { UmaCharacterAptitude } from "@/types/uma/character";

export function calculateUniqueLevelScore(
    starLevel: number,
    uniqueLevel: number,
) {
    return uniqueLevel * (starLevel < 3 ? 120 : 170);
}

export function calculateStatsScore(stats: DataArray) {
    return stats.slice(0, 5).map((i) => statScores[i], 0) as StatArray;
}

function getMultipler(grade: UmaRank) {
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
        let multiplier = 1.0;
        aptitudeMatch.forEach((apt) => {
            let aptRank = "";
            if (terrain.includes(apt)) {
                aptRank = aptitude.surface[apt.toLowerCase()];
            } else if (distances.includes(apt)) {
                aptRank = aptitude.distance[apt.toLowerCase()];
            } else if (strategies.includes(apt)) {
                aptRank = aptitude.strategy[apt.toLowerCase()];
            }
            multiplier *= getMultipler(aptRank as UmaRank);
        });
        score *= multiplier;
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
