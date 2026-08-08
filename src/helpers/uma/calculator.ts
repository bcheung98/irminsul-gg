import { UmaSkillOption } from "@/components/_uma/RatingCalculator/RatingCalculatorSkills";
import { badgeSpriteMap, ranks, sheetSize, statScores } from "@/data/uma/ranks";
import { UmaRank } from "@/types/uma";
import { UmaCharacterAptitude } from "@/types/uma/character";

export function calculateUniqueLevelScore(
    starLevel: number,
    uniqueLevel: number,
) {
    return uniqueLevel * (starLevel < 3 ? 120 : 170);
}

export function calculateStatsScore(
    stats: [number, number, number, number, number, number, number],
) {
    return stats.slice(0, 5).reduce((a, c) => a + statScores[c], 0);
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
    let baseValue = skill.values[0];
    let checkType = skill.values[5];
    let score = Number(baseValue);
    if (checkType) {
        let aptitudeMatch = checkType.split("/");
        let multiplier = 1.0;
        aptitudeMatch.forEach((apt) => {
            apt = apt.toLowerCase();
            let aptRank: string = "";
            if (["turf", "dirt"].includes(apt)) {
                aptRank = aptitude.surface[apt];
            } else if (["sprint", "mile", "medium", "long"].includes(apt)) {
                aptRank = aptitude.distance[apt];
            } else if (["front", "pace", "late", "end"].includes(apt)) {
                aptRank = aptitude.strategy[apt];
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
