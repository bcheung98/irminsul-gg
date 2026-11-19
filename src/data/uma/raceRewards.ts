import { getRaceRewards } from "@/helpers/uma/getRaceRewards";
import type { EventRewards } from "@/types/uma/event";
import type { RaceRewardEntry, RaceRewardTable } from "@/types/uma/race";

const g1 = [
    createRaceRewards([1, 1], 5, 3, 45, true),
    createRaceRewards([2, 2], 5, 2, 45, true),
    createRaceRewards([3, 3], 5, 1, 45, true),
    createRaceRewards([4, 0], 5, 1, 35, true),
];

export const raceRewardTables: Record<string, RaceRewardTable> = {
    goal_debut: {
        base: [
            createRaceRewards([1, 1], 3, 3, 30, true),
            createRaceRewards([2, 2], 3, 2, 30, true),
            createRaceRewards([3, 0], 3, 1, 30, true),
        ],
        postTracenKen: g1,
    },

    goal_op: {
        base: [
            createRaceRewards([1, 1], 3, 3, 30, true),
            createRaceRewards([2, 2], 3, 2, 30, true),
            createRaceRewards([3, 3], 3, 1, 30, true),
        ],
        postTracenKen: g1,
    },

    goal_g23: {
        base: [
            createRaceRewards([1, 1], 4, 3, 35, true),
            createRaceRewards([2, 2], 4, 2, 35, true),
            createRaceRewards([3, 5], 4, 1, 30, true),
            createRaceRewards([6, 0], 4, 1, 30, true),
        ],
        postTracenKen: g1,
    },

    goal_g1: {
        base: g1,
    },

    goal_non_race: {
        fixed: true,
        base: [createRaceRewards([0, 0], 5, 3, 20, true)],
        postTracenKen: [createRaceRewards([0, 0], 5, 3, 45, true)],
    },

    optional_op: {
        base: [
            createRaceRewards([1, 1], 1, 5, 30, false, -15),
            createRaceRewards([2, 5], 1, 3, 30, false, -15),
            createRaceRewards([6, 0], 1, 0, 10, false, -15),
        ],
    },

    optional_g23: {
        base: [
            createRaceRewards([1, 1], 1, 8, 35, false, -15),
            createRaceRewards([2, 2], 1, 6, 35, false, -15),
            createRaceRewards([3, 3], 1, 5, 35, false, -15),
            createRaceRewards([4, 5], 1, 4, 30, false, -15),
            createRaceRewards([6, 0], 1, 3, 20, false, -15),
        ],
    },

    optional_g1: {
        base: [
            createRaceRewards([1, 1], 1, 10, 45, false, -15),
            createRaceRewards([2, 2], 1, 8, 45, false, -15),
            createRaceRewards([3, 3], 1, 6, 45, false, -15),
            createRaceRewards([4, 5], 1, 5, 35, false, -15),
            createRaceRewards([6, 0], 1, 4, 25, false, -15),
        ],
    },

    "5s3_sp75": {
        fixed: true,
        base: [createRaceRewards(null, 5, 3, 75, true)],
    },

    "5s3_sp45": {
        fixed: true,
        base: [createRaceRewards(null, 5, 3, 45, true)],
    },

    "en-15_3s10_sp75": {
        fixed: true,
        base: [createRaceRewards(null, 3, 10, 75, false, -15)],
    },

    "en-15_3s8_sp65": {
        fixed: true,
        base: [createRaceRewards(null, 3, 8, 65, false, -15)],
    },

    "en-15_1s10_sp45": {
        fixed: true,
        base: [createRaceRewards(null, 1, 10, 45, false, -15)],
    },

    "en-15_1s8_sp35": {
        fixed: true,
        base: [createRaceRewards(null, 1, 8, 35, false, -15)],
    },
};

function createRaceRewards(
    placement: [number, number] | null,
    stats: number,
    amount: number,
    skillPoints: number,
    bond = false,
    energy = 0,
): RaceRewardEntry {
    const rewards: EventRewards[] = [];

    if (energy !== 0) {
        rewards.push({ tag: "en", value: `${energy}` });
    }

    if (stats === 5) {
        rewards.push({ tag: "5s", value: `+${amount}` });
    } else if (stats > 0) {
        rewards.push({
            tag: "rs",
            value: `+${amount}`,
            count: stats,
        });
    }

    rewards.push({ tag: "pt", value: `+${skillPoints}` });

    if (bond) {
        rewards.push({
            tag: "goal_npc_bond",
            value: "+4",
        });
    }

    return {
        placement,
        rewards,
    };
}

export const optionalRaceTypes = [
    { label: "G1", value: "optional_g1" },
    { label: "G2/G3", value: "optional_g23" },
    { label: "Pre-OP/OP", value: "optional_op" },
];

export const optionalRacePlacements = {
    optional_win: 1,
    optional_place: 2,
    optional_lose: 6,
} as const;

export function getOptionalRaceRewards(
    raceType: keyof typeof optionalRacePlacements,
    selectedType: string,
): EventRewards[] {
    const place = optionalRacePlacements[raceType];

    return getRaceRewards(selectedType, place).filter(
        (reward) => reward.tag !== "en",
    );
}
