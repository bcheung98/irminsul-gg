export const characterLevel = (rarity: number, name?: string) => {
    const index = rarity - 4;
    return {
        credits: characterLevelCosts.credits[index],
        characterXP1: characterLevelCosts.characterXP1[index],
        characterXP2: characterLevelCosts.characterXP2[index],
        characterXP3: characterLevelCosts.characterXP3[index],
        boss: name?.startsWith("Trailblazer")
            ? [0, 0, 0, 0, 0, 0, 4, 0, 6, 0, 8, 0, 10, 0]
            : characterLevelCosts.boss[index],
        common1: characterLevelCosts.common1[index],
        common2: characterLevelCosts.common2[index],
        common3: characterLevelCosts.common3[index],
    };
};

// [4-Star Cost, 5-Star Cost]
export const characterLevelCosts = {
    credits: [
        [
            0, 11300, 3200, 17800, 6400, 20700, 12800, 39300, 32000, 82300,
            64000, 132700, 128000, 276300,
        ],
        [
            0, 11300, 4000, 17800, 8000, 20700, 16000, 39300, 40000, 82300,
            80000, 132700, 160000, 276300,
        ],
    ],
    characterXP1: [
        [0, 3, 0, 3, 0, 2, 0, 0, 0, 3, 0, 2, 0, 3, 0],
        [0, 3, 0, 3, 0, 2, 0, 0, 0, 3, 0, 2, 0, 3, 0],
    ],
    characterXP2: [
        [0, 2, 0, 4, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 2, 0, 4, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    ],
    characterXP3: [
        [0, 5, 0, 8, 0, 10, 0, 19, 0, 41, 0, 66, 0, 138, 0],
        [0, 5, 0, 8, 0, 10, 0, 19, 0, 41, 0, 66, 0, 138, 0],
    ],
    boss: [
        [0, 0, 0, 0, 0, 0, 2, 0, 5, 0, 15, 0, 28, 0],
        [0, 0, 0, 0, 0, 0, 3, 0, 7, 0, 20, 0, 35, 0],
    ],
    common1: [
        [0, 0, 4, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    common2: [
        [0, 0, 0, 0, 0, 0, 5, 0, 8, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 6, 0, 9, 0, 0, 0, 0, 0, 0],
    ],
    common3: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 7, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 9, 0, 0],
    ],
};

export const characterSkill = (
    rarity: number,
    skillKey: string,
    path: string
) => {
    let costArray;
    switch (path) {
        case "Remembrance":
            costArray = characterSkillCostsRemembrance;
            break;
        case "Elation":
            costArray = characterSkillCostsElation;
            break;
        default:
            costArray = characterSkillCosts;
            break;
    }
    const index = rarity - 4;
    const key = skillKey === "attack" ? "attack" : "skill";
    return {
        credits: costArray[key].credits[index],
        weekly: costArray[key].weekly[index],
        crown: costArray[key].crown[index],
        calyx1: costArray[key].calyx1[index],
        calyx2: costArray[key].calyx2[index],
        calyx3: costArray[key].calyx3[index],
        common1: costArray[key].common1[index],
        common2: costArray[key].common2[index],
        common3: costArray[key].common3[index],
    };
};

// [4-Star Cost, 5-Star Cost]
export const characterSkillCosts = {
    attack: {
        credits: [
            [0, 4000, 8000, 16000, 36000, 128000],
            [0, 5000, 10000, 20000, 45000, 160000],
        ],
        calyx1: [
            [0, 2, 0, 0, 0, 0],
            [0, 3, 0, 0, 0, 0],
        ],
        calyx2: [
            [0, 0, 2, 4, 0, 0],
            [0, 0, 3, 5, 0, 0],
        ],
        calyx3: [
            [0, 0, 0, 0, 2, 6],
            [0, 0, 0, 0, 3, 8],
        ],
        common1: [
            [0, 4, 0, 0, 0, 0],
            [0, 6, 0, 0, 0, 0],
        ],
        common2: [
            [0, 0, 2, 3, 0, 0],
            [0, 0, 3, 4, 0, 0],
        ],
        common3: [
            [0, 0, 0, 0, 2, 3],
            [0, 0, 0, 0, 3, 4],
        ],
        weekly: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        crown: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
    },
    skill: {
        credits: [
            [0, 2000, 4000, 8000, 16000, 24000, 36000, 64000, 128000, 240000],
            [0, 2500, 5000, 10000, 20000, 30000, 45000, 80000, 160000, 300000],
        ],
        calyx1: [
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
        ],
        calyx2: [
            [0, 0, 0, 2, 4, 6, 0, 0, 0, 0],
            [0, 0, 0, 3, 5, 7, 0, 0, 0, 0],
        ],
        calyx3: [
            [0, 0, 0, 0, 0, 0, 2, 4, 6, 11],
            [0, 0, 0, 0, 0, 0, 3, 5, 8, 14],
        ],
        common1: [
            [0, 2, 4, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 6, 0, 0, 0, 0, 0, 0, 0],
        ],
        common2: [
            [0, 0, 0, 2, 3, 5, 0, 0, 0, 0],
            [0, 0, 0, 3, 4, 6, 0, 0, 0, 0],
        ],
        common3: [
            [0, 0, 0, 0, 0, 0, 2, 3, 0, 0],
            [0, 0, 0, 0, 0, 0, 3, 4, 0, 0],
        ],
        weekly: [
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        ],
        crown: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        ],
    },
};

// Costs for Remembrance characters
// [4-Star Cost, 5-Star Cost]
export const characterSkillCostsRemembrance = {
    attack: {
        credits: [
            [0, 2800, 5600, 12800, 28000, 112000],
            [0, 3500, 7000, 16000, 35000, 140000],
        ],
        calyx1: [
            [0, 1, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 0],
        ],
        calyx2: [
            [0, 0, 1, 3, 0, 0],
            [0, 0, 2, 4, 0, 0],
        ],
        calyx3: [
            [0, 0, 0, 0, 2, 5],
            [0, 0, 0, 0, 2, 6],
        ],
        common1: [
            [0, 3, 0, 0, 0, 0],
            [0, 4, 0, 0, 0, 0],
        ],
        common2: [
            [0, 0, 1, 2, 0, 0],
            [0, 0, 2, 3, 0, 0],
        ],
        common3: [
            [0, 0, 0, 0, 2, 2],
            [0, 0, 0, 0, 2, 2],
        ],
        weekly: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        crown: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
    },
    skill: {
        credits: [
            [0, 2000, 2800, 5600, 12800, 20000, 28000, 56000, 112000, 192000],
            [0, 2500, 3500, 7000, 16000, 25000, 35000, 70000, 140000, 240000],
        ],
        calyx1: [
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
        ],
        calyx2: [
            [0, 0, 0, 1, 3, 5, 0, 0, 0, 0],
            [0, 0, 0, 2, 4, 6, 0, 0, 0, 0],
        ],
        calyx3: [
            [0, 0, 0, 0, 0, 0, 2, 3, 5, 9],
            [0, 0, 0, 0, 0, 0, 2, 5, 6, 13],
        ],
        common1: [
            [0, 2, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 4, 0, 0, 0, 0, 0, 0, 0],
        ],
        common2: [
            [0, 0, 0, 1, 2, 5, 0, 0, 0, 0],
            [0, 0, 0, 2, 3, 6, 0, 0, 0, 0],
        ],
        common3: [
            [0, 0, 0, 0, 0, 0, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 4, 0, 0],
        ],
        weekly: [
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        ],
        crown: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        ],
    },
};

export const characterMemosprite = (rarity: number) => {
    const index = rarity - 4;
    return {
        credits: characterMemospriteCosts.credits[index],
        calyx1: characterMemospriteCosts.calyx1[index],
        calyx2: characterMemospriteCosts.calyx2[index],
        calyx3: characterMemospriteCosts.calyx3[index],
        common1: characterMemospriteCosts.common1[index],
        common2: characterMemospriteCosts.common2[index],
        common3: characterMemospriteCosts.common3[index],
    };
};

export const characterMemospriteCosts = {
    credits: [
        [0, 2800, 5600, 12800, 28000, 112000],
        [0, 3500, 7000, 16000, 35000, 140000],
    ],
    calyx1: [
        [0, 1, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0],
    ],
    calyx2: [
        [0, 0, 1, 3, 0, 0],
        [0, 0, 2, 4, 0, 0],
    ],
    calyx3: [
        [0, 0, 0, 0, 2, 5],
        [0, 0, 0, 0, 2, 6],
    ],
    common1: [
        [0, 3, 0, 0, 0, 0],
        [0, 4, 0, 0, 0, 0],
    ],
    common2: [
        [0, 0, 1, 2, 0, 0],
        [0, 0, 2, 3, 0, 0],
    ],
    common3: [
        [0, 0, 0, 0, 2, 2],
        [0, 0, 0, 0, 2, 2],
    ],
};

// Costs for Elation characters
// [4-Star Cost, 5-Star Cost]
export const characterSkillCostsElation = {
    attack: {
        credits: [
            [0, 2800, 5600, 12800, 28000, 112000],
            [0, 4000, 8000, 16000, 32000, 120000],
        ],
        calyx1: [
            [0, 1, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 0],
        ],
        calyx2: [
            [0, 0, 1, 3, 0, 0],
            [0, 0, 2, 3, 0, 0],
        ],
        calyx3: [
            [0, 0, 0, 0, 2, 5],
            [0, 0, 0, 0, 3, 5],
        ],
        common1: [
            [0, 3, 0, 0, 0, 0],
            [0, 5, 0, 0, 0, 0],
        ],
        common2: [
            [0, 0, 1, 2, 0, 0],
            [0, 0, 2, 3, 0, 0],
        ],
        common3: [
            [0, 0, 0, 0, 2, 2],
            [0, 0, 0, 0, 2, 2],
        ],
        weekly: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        crown: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
    },
    skill: {
        credits: [
            [0, 2000, 2800, 5600, 12800, 20000, 28000, 56000, 112000, 192000],
            [0, 2000, 4000, 8000, 15000, 24000, 32000, 65000, 120000, 250000],
        ],
        calyx1: [
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
        ],
        calyx2: [
            [0, 0, 0, 1, 3, 5, 0, 0, 0, 0],
            [0, 0, 0, 2, 4, 6, 0, 0, 0, 0],
        ],
        calyx3: [
            [0, 0, 0, 0, 0, 0, 2, 3, 5, 9],
            [0, 0, 0, 0, 0, 0, 2, 4, 6, 12],
        ],
        common1: [
            [0, 2, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 5, 0, 0, 0, 0, 0, 0, 0],
        ],
        common2: [
            [0, 0, 0, 1, 2, 5, 0, 0, 0, 0],
            [0, 0, 0, 3, 3, 5, 0, 0, 0, 0],
        ],
        common3: [
            [0, 0, 0, 0, 0, 0, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 4, 0, 0],
        ],
        weekly: [
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        ],
        crown: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        ],
    },
};

interface CharacterTraceCost {
    credits: [number, number];
    calyx1: [number, number];
    calyx2: [number, number];
    calyx3: [number, number];
    common1: [number, number];
    common2: [number, number];
    common3: [number, number];
    weekly: [number, number];
    crown: [number, number];
}

// [4-Star Cost, 5-Star Cost]
export const characterTraceMainCosts = {
    A2: {
        credits: [4000, 5000],
        calyx1: [2, 3],
        weekly: [1, 1],
    } as CharacterTraceCost,
    A4: {
        credits: [16000, 20000],
        calyx2: [4, 5],
        weekly: [1, 1],
        crown: [1, 1],
    } as CharacterTraceCost,
    A6: {
        credits: [128000, 160000],
        calyx3: [6, 8],
        weekly: [1, 1],
        crown: [1, 1],
    } as CharacterTraceCost,
};

// Costs for Remembrance characters
// [4-Star Cost, 5-Star Cost]
export const characterTraceMainCostsRemembrance = {
    A2: {
        credits: [4000, 5000],
        calyx1: [2, 3],
        weekly: [1, 1],
    } as CharacterTraceCost,
    A4: {
        credits: [16000, 20000],
        calyx2: [5, 5],
        weekly: [1, 1],
        crown: [1, 1],
    } as CharacterTraceCost,
    A6: {
        credits: [128000, 160000],
        calyx3: [6, 8],
        weekly: [1, 1],
        crown: [1, 1],
    } as CharacterTraceCost,
};

// Costs for Elation characters
// [4-Star Cost, 5-Star Cost]
export const characterTraceMainCostsElation = {
    A2: {
        credits: [4000, 5000],
        calyx1: [2, 2],
        weekly: [1, 1],
    } as CharacterTraceCost,
    A4: {
        credits: [16000, 20000],
        calyx2: [5, 4],
        weekly: [1, 1],
        crown: [1, 1],
    } as CharacterTraceCost,
    A6: {
        credits: [128000, 140000],
        calyx3: [6, 8],
        weekly: [1, 1],
        crown: [1, 1],
    } as CharacterTraceCost,
};

// [4-Star Cost, 5-Star Cost]
export const characterTraceSmallCosts = {
    A2: {
        credits: [4000, 5000],
        calyx1: [2, 3],
        common1: [4, 6],
    } as CharacterTraceCost,
    A3: {
        credits: [8000, 10000],
        calyx2: [2, 3],
        common2: [2, 3],
    } as CharacterTraceCost,
    A4: {
        credits: [16000, 20000],
        calyx2: [4, 5],
        common2: [3, 4],
    } as CharacterTraceCost,
    A5: {
        credits: [36000, 45000],
        calyx3: [2, 3],
        common3: [2, 3],
    } as CharacterTraceCost,
    A6: {
        credits: [128000, 160000],
        calyx3: [6, 8],
        common3: [6, 8],
    } as CharacterTraceCost,
    "Lv. 1": {
        credits: [2000, 2500],
        common1: [2, 2],
    } as CharacterTraceCost,
    "Lv. 75": {
        credits: [128000, 160000],
        calyx3: [6, 8],
        common3: [6, 8],
    } as CharacterTraceCost,
    "Lv. 80": {
        credits: [128000, 160000],
        calyx3: [6, 8],
        common3: [6, 8],
    } as CharacterTraceCost,
};

// Costs for Remembrance characters
// [4-Star Cost, 5-Star Cost]
export const characterTraceSmallCostsRemembrance = {
    A2: {
        credits: [3200, 4000],
        calyx1: [1, 3],
        common1: [2, 6],
    } as CharacterTraceCost,
    A3: {
        credits: [7200, 9000],
        calyx2: [2, 3],
        common2: [2, 2],
    } as CharacterTraceCost,
    A4: {
        credits: [15200, 19000],
        calyx2: [5, 4],
        common2: [2, 4],
    } as CharacterTraceCost,
    A5: {
        credits: [36000, 45000],
        calyx3: [2, 3],
        common3: [2, 3],
    } as CharacterTraceCost,
    A6: {
        credits: [112000, 140000],
        calyx3: [5, 7],
        common3: [3, 6],
    } as CharacterTraceCost,
    "Lv. 1": {
        credits: [2000, 2500],
        common1: [2, 2],
    } as CharacterTraceCost,
    "Lv. 75": {
        credits: [128000, 160000],
        calyx3: [6, 8],
        common3: [6, 8],
    } as CharacterTraceCost,
    "Lv. 80": {
        credits: [128000, 160000],
        calyx3: [6, 8],
        common3: [6, 8],
    } as CharacterTraceCost,
};

// Costs for Elation characters
// [4-Star Cost, 5-Star Cost]
export const characterTraceSmallCostsElation = {
    A2: {
        credits: [3200, 5000],
        calyx1: [1, 2],
        common1: [2, 6],
    } as CharacterTraceCost,
    A3: {
        credits: [7200, 10000],
        calyx2: [2, 4],
        common2: [2, 2],
    } as CharacterTraceCost,
    A4: {
        credits: [15200, 18000],
        calyx2: [5, 4],
        common2: [2, 3],
    } as CharacterTraceCost,
    A5: {
        credits: [36000, 45000],
        calyx3: [2, 3],
        common3: [2, 2],
    } as CharacterTraceCost,
    A6: {
        credits: [112000, 120000],
        calyx3: [5, 5],
        common3: [3, 2],
    } as CharacterTraceCost,
    "Lv. 1": {
        credits: [2000, 2000],
        common1: [2, 2],
    } as CharacterTraceCost,
    "Lv. 75": {
        credits: [128000, 160000],
        calyx3: [6, 8],
        common3: [6, 8],
    } as CharacterTraceCost,
    "Lv. 80": {
        credits: [128000, 160000],
        calyx3: [6, 8],
        common3: [6, 8],
    } as CharacterTraceCost,
};

export const weaponLevel = (rarity: number) => {
    const index = rarity - 3;
    return {
        credits: weaponCosts.credits[index],
        weaponXP1: weaponCosts.weaponXP1[index],
        weaponXP2: weaponCosts.weaponXP2[index],
        weaponXP3: weaponCosts.weaponXP3[index],
        calyx1: weaponCosts.calyx1[index],
        calyx2: weaponCosts.calyx2[index],
        calyx3: weaponCosts.calyx3[index],
        common1: weaponCosts.common1[index],
        common2: weaponCosts.common2[index],
        common3: weaponCosts.common3[index],
    };
};

export const weaponCosts = {
    credits: [
        [
            0, 8000, 3000, 13800, 6000, 18000, 12000, 27750, 30000, 43250,
            60000, 65750, 120000, 124000,
        ],
        [
            0, 10750, 4000, 17250, 8000, 24000, 16000, 37000, 40000, 57500,
            80000, 87500, 160000, 165250,
        ],
        [
            0, 13250, 5000, 21500, 10000, 29750, 20000, 46250, 50000, 71750,
            100000, 109250, 200000, 206750,
        ],
    ],
    weaponXP1: [
        [0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 0, 3, 0, 0],
        [0, 3, 0, 1, 0, 0, 0, 0, 0, 2, 0, 2, 0, 1],
        [0, 1, 0, 2, 0, 3, 0, 1, 0, 3, 0, 1, 0, 3],
    ],
    weaponXP2: [
        [0, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2, 0, 1],
        [0, 1, 0, 2, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2],
    ],
    weaponXP3: [
        [0, 2, 0, 4, 0, 6, 0, 9, 0, 14, 0, 21, 0, 41],
        [0, 3, 0, 5, 0, 7, 0, 12, 0, 19, 0, 29, 0, 55],
        [0, 4, 0, 7, 0, 9, 0, 15, 0, 23, 0, 36, 0, 68],
    ],
    calyx1: [
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    calyx2: [
        [0, 0, 0, 0, 0, 0, 2, 0, 4, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 4, 0, 8, 0, 0, 0, 0, 0, 0],
    ],
    calyx3: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 6, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 8, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 10, 0, 0],
    ],
    common1: [
        [0, 0, 4, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 8, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    common2: [
        [0, 0, 0, 0, 0, 0, 4, 0, 6, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 6, 0, 9, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 8, 0, 12, 0, 0, 0, 0, 0, 0],
    ],
    common3: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 5, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 7, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 8, 0, 0],
    ],
};
