import { ZZZRarity } from "@/types/zzz";

export const characterLevel = {
    credits: [0, 0, 24000, 0, 56000, 0, 120000, 0, 200000, 0, 400000, 0],
    characterXP1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    characterXP2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    characterXP3: [0, 2, 0, 8, 0, 20, 0, 45, 0, 75, 0, 150],
    characterLevel1: [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    characterLevel2: [0, 0, 0, 0, 12, 0, 20, 0, 0, 0, 0, 0],
    characterLevel3: [0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 20, 0],
};

export const characterSkill = {
    credits: [
        0, 2000, 3000, 6000, 9000, 12000, 18000, 45000, 67500, 90000, 112500,
        135000,
    ],
    characterSkill1: [0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    characterSkill2: [0, 0, 0, 2, 3, 4, 6, 0, 0, 0, 0, 0],
    characterSkill3: [0, 0, 0, 0, 0, 0, 0, 5, 8, 10, 12, 15],
    crown: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
};

export const characterCoreSkill = {
    credits: [0, 5000, 12000, 28000, 60000, 100000, 200000],
    boss: [0, 0, 2, 4, 9, 15, 30],
    weekly: [0, 0, 0, 0, 2, 3, 4],
};

export const weaponLevel = (rarity: ZZZRarity) => {
    const rank = rarity - 3;
    return {
        credits: weaponCosts.credits[rank],
        weaponXP1: weaponCosts.weaponXP1[rank],
        weaponXP2: weaponCosts.weaponXP2[rank],
        weaponXP3: weaponCosts.weaponXP3[rank],
        weaponLevel1: weaponCosts.weaponLevel1[rank],
        weaponLevel2: weaponCosts.weaponLevel2[rank],
        weaponLevel3: weaponCosts.weaponLevel3[rank],
    };
};

const weaponCosts = {
    credits: [
        [0, 0, 7200, 0, 16800, 0, 36000, 0, 60000, 0, 120000, 0],
        [0, 0, 9600, 0, 22400, 0, 48000, 0, 80000, 0, 160000, 0],
        [0, 0, 12000, 0, 28000, 0, 60000, 0, 100000, 0, 200000, 0],
    ],
    weaponXP1: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0],
        [0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0],
    ],
    weaponXP2: [
        [0, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    ],
    weaponXP3: [
        [0, 0, 0, 3, 0, 8, 0, 18, 0, 30, 0, 60],
        [0, 1, 0, 4, 0, 10, 0, 23, 0, 40, 0, 80],
        [0, 1, 0, 5, 0, 13, 0, 30, 0, 50, 0, 100],
    ],
    weaponLevel1: [
        [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    weaponLevel2: [
        [0, 0, 0, 0, 7, 0, 12, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 10, 0, 16, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 12, 0, 20, 0, 0, 0, 0, 0],
    ],
    weaponLevel3: [
        [0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 12, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 16, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 20, 0],
    ],
};
