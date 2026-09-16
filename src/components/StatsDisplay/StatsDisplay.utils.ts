// Helper imports
import { splitJoin } from "@/utils";
import levelData from "@/data/levels";
import {
    baseATKScaling as genshinBaseATKScaling,
    subStats as genshinSubstats,
} from "@/data/genshin/weaponStats";
import { characterAscensionStatScalings } from "@/data/genshin/characterAscensionStats";
import { weaponStats as hsrWeaponStats } from "@/data/hsr/weaponStats";
import {
    baseATKScaling as wuwaBaseATKScaling,
    subStats as wuwaSubstats,
} from "@/data/wuwa/weaponStats";
import {
    weaponMainStats as zzzMainStatScaling,
    weaponSubStats as zzzSubstats,
} from "@/data/zzz/weaponStats";
import { baseATKScaling as endfieldBaseATKScaling } from "@/data/endfield/weaponStats";
import { GearStat, gearStats } from "@/data/endfield/gearStats";
import {
    baseATKScaling as nteBaseATKScaling,
    subStats as nteSubstats,
    weaponSubStats as nteSubstatNames,
} from "@/data/nte/weaponStats";

// Type imports
import { StatsDisplayProps, TStats } from "./StatsDisplay.types";
import { GenshinStats } from "@/types/genshin";
import { HSRStats } from "@/types/hsr";
import { ZZZRarity, ZZZStats } from "@/types/zzz";
import { WuWaStats } from "@/types/wuwa";
import { EndfieldStats } from "@/types/endfield";
import { NTEStats } from "@/types/nte";

type GetStatsProps<T> = Omit<StatsDisplayProps<T>, "game">;
type StatsData = {
    levels: (string | number)[];
    data: (string | number)[][];
};

export function getStats<TStats>({
    game,
    stats,
    attributes,
}: StatsDisplayProps<TStats>): StatsData {
    switch (game) {
        case "genshin":
            return getGenshinStats({
                stats: stats as GenshinStats,
                attributes,
            });
        case "hsr":
            return getHSRStats({ stats: stats as HSRStats, attributes });
        case "wuwa":
            return getWuWaStats({ stats: stats as WuWaStats, attributes });
        case "zzz":
            return getZZZStats({ stats: stats as ZZZStats, attributes });
        case "endfield":
            return getEndfieldStats({
                stats: stats as EndfieldStats,
                attributes,
            });
        case "nte":
            return getNTEStats({ stats: stats as NTEStats, attributes });
        case "uma":
        default:
            return { levels: [], data: [] };
    }
}

function getGenshinStats({
    stats,
    attributes,
}: GetStatsProps<GenshinStats>): StatsData {
    let levels: (string | number)[] = [];
    let data: (string | number)[][] = [];
    if ("ascensionStat" in stats) {
        const { rarity = 4 } = attributes;
        const ascensionStats = characterAscensionStatScalings(
            rarity,
            stats.ascensionStat,
            { em: stats.em },
        );
        const ascStatScaling = !["CRIT Rate", "CRIT DMG"].includes(
            stats.ascensionStat,
        )
            ? ascensionStats[stats.ascensionStat]
            : undefined;

        levels = [
            "1",
            "20",
            "20+",
            "40",
            "40+",
            "50",
            "50+",
            "60",
            "60+",
            "70",
            "70+",
            "80",
            "80+",
            "90",
            "95",
            "100",
        ];

        data = [
            ["Level", ...levels],
            [
                "Base HP|genshin/icons/stat-icons/HP",
                ...levels.map((_, index) =>
                    (stats.hp[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Base ATK|genshin/icons/stat-icons/ATK",
                ...levels.map((_, index) =>
                    (stats.atk[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Base DEF|genshin/icons/stat-icons/DEF",
                ...levels.map((_, index) =>
                    (stats.def[index] || 0).toLocaleString(),
                ),
            ],
            [
                "CRIT Rate|genshin/icons/stat-icons/CRIT_Rate",
                ...levels.map(
                    (_, index) =>
                        (ascensionStats["CRIT Rate"] &&
                            ascensionStats["CRIT Rate"][index]) ||
                        0,
                ),
            ],
            [
                "CRIT DMG|genshin/icons/stat-icons/CRIT_DMG",
                ...levels.map(
                    (_, index) =>
                        (ascensionStats["CRIT DMG"] &&
                            ascensionStats["CRIT DMG"][index]) ||
                        0,
                ),
            ],
        ];
        stats.em.reduce((a, c) => a + c) != 0 &&
            stats.ascensionStat !== "Elemental Mastery" &&
            data.push([
                "Elemental Mastery|genshin/icons/stat-icons/Elemental_Mastery",
                ...levels.map((_, index) =>
                    (stats.em[index] || 0).toLocaleString(),
                ),
            ]);
        ascStatScaling &&
            data.push([
                `${stats.ascensionStat}|genshin/icons/stat-icons/${splitJoin(
                    stats.ascensionStat,
                )}`,
                ...levels.map((_, index) => ascStatScaling[index]),
            ]);
    } else if ("subStat" in stats) {
        const { rarity = 3 } = attributes;

        levels = [
            "1",
            "20",
            "20+",
            "40",
            "40+",
            "50",
            "50+",
            "60",
            "60+",
            "70",
            "70+",
            "80",
            "80+",
            "90",
        ];
        if (rarity < 3) {
            levels = levels.slice(0, -4);
        }

        data = [
            ["Level", ...levels],
            [
                "Base ATK|genshin/icons/stat-icons/ATK",
                ...levels.map((_, index) =>
                    (
                        genshinBaseATKScaling[stats.atk][index] || 0
                    ).toLocaleString(),
                ),
            ],
        ];
        if (stats.subStat) {
            let subStatScaling = genshinSubstats[stats.atk][
                stats.subStat
            ] as string[];
            data.push([
                `${stats.subStat}|genshin/icons/stat-icons/${splitJoin(
                    stats.subStat,
                )}`,
                ...levels.map((_, index) => subStatScaling[index] || 0),
            ]);
        }
    }

    return { levels, data };
}

function getHSRStats({ stats }: GetStatsProps<HSRStats>): StatsData {
    const levels = levelData["hsr"]("level-asc");
    let data: (string | number)[][] = [];
    if ("speed" in stats) {
        data = [
            ["Level", ...levels],
            [
                `Base HP|hsr/icons/stat-icons/HP`,
                ...levels.map((_, index) =>
                    (stats.hp[index] || 0).toLocaleString(),
                ),
            ],
            [
                `Base ATK|hsr/icons/stat-icons/ATK`,
                ...levels.map((_, index) =>
                    (stats.atk[index] || 0).toLocaleString(),
                ),
            ],
            [
                `Base DEF|hsr/icons/stat-icons/DEF`,
                ...levels.map((_, index) =>
                    (stats.def[index] || 0).toLocaleString(),
                ),
            ],
            [
                "SPD|hsr/icons/stat-icons/SPD",
                ...levels.map((_, index) =>
                    (stats.speed[index] || 0).toLocaleString(),
                ),
            ],
            [
                `Taunt|hsr/icons/stat-icons/Taunt`,
                ...levels.map((_, index) => stats.taunt[index]),
            ],
        ];
    } else {
        data = [
            ["Level", ...levels],
            [
                `HP|hsr/icons/stat-icons/HP`,
                ...levels.map((_, index) =>
                    (hsrWeaponStats.hp[stats.hp][index] || 0).toLocaleString(),
                ),
            ],
            [
                `ATK|hsr/icons/stat-icons/ATK`,
                ...levels.map((_, index) =>
                    (
                        hsrWeaponStats.atk[stats.atk][index] || 0
                    ).toLocaleString(),
                ),
            ],
            [
                `DEF|hsr/icons/stat-icons/DEF`,
                ...levels.map((_, index) =>
                    (
                        hsrWeaponStats.def[stats.def][index] || 0
                    ).toLocaleString(),
                ),
            ],
        ];
    }

    return { levels, data };
}

function getWuWaStats({
    stats,
    attributes,
}: GetStatsProps<WuWaStats>): StatsData {
    const levels = levelData["wuwa"]("level-asc", attributes.rarity);
    let data: (string | number)[][] = [];
    if ("hp" in stats) {
        data = [
            ["Level", ...levels],
            [
                "Base HP|wuwa/icons/stat-icons/HP",
                ...levels.map((_, index) =>
                    (stats.hp[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Base ATK|wuwa/icons/stat-icons/ATK",
                ...levels.map((_, index) =>
                    (stats.atk[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Base DEF|wuwa/icons/stat-icons/DEF",
                ...levels.map((_, index) =>
                    (stats.def[index] || 0).toLocaleString(),
                ),
            ],
        ];
    } else if ("subStat" in stats) {
        data = [
            ["Level", ...levels],
            [
                "Base ATK|wuwa/icons/stat-icons/ATK",
                ...levels.map((_, index) =>
                    (
                        wuwaBaseATKScaling[stats.atk][index] || 0
                    ).toLocaleString(),
                ),
            ],
        ];
        if (stats.subStat) {
            let subStatScaling = wuwaSubstats[stats.atk][
                stats.subStat
            ] as string[];
            data.push([
                `${stats.subStat}|wuwa/icons/stat-icons/${splitJoin(
                    stats.subStat,
                )}`,
                ...levels.map((_, index) => subStatScaling[index] || 0),
            ]);
        }
    }

    return { levels, data };
}

function getZZZStats({
    stats,
    attributes,
}: GetStatsProps<ZZZStats>): StatsData {
    const levels = levelData["zzz"]("level-asc");
    let data: (string | number)[][] = [];
    if ("ascension" in stats) {
        data = [
            ["Level", ...levels],
            [
                "Base HP|zzz/icons/stat-icons/HP",
                ...levels.map((_, index) =>
                    (stats.hp[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Base ATK|zzz/icons/stat-icons/ATK",
                ...levels.map((_, index) =>
                    (stats.atk[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Base DEF|zzz/icons/stat-icons/DEF",
                ...levels.map((_, index) =>
                    (stats.def[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Impact|zzz/icons/stat-icons/Impact",
                ...levels.map((_, index) =>
                    (stats.impact[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Anomaly Mastery|zzz/icons/stat-icons/Anomaly_Mastery",
                ...levels.map((_, index) =>
                    (stats.am[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Anomaly Proficiency|zzz/icons/stat-icons/Anomaly_Proficiency",
                ...levels.map((_, index) =>
                    (stats.ap[index] || 0).toLocaleString(),
                ),
            ],
        ];
    } else if ("mainStat" in stats) {
        data = [
            ["Level", ...levels],
            [
                `${stats.mainStat.type}|zzz/icons/stat-icons/ATK`,
                ...levels.map((_, index) =>
                    (
                        zzzMainStatScaling[stats.mainStat.type].scaling[
                            stats.mainStat.value
                        ][index] || 0
                    ).toLocaleString(),
                ),
            ],
        ];
        if (stats.subStat) {
            let subStatScaling = zzzSubstats[stats.subStat].scaling[
                attributes.rarity as Exclude<ZZZRarity, 2 | 1>
            ] as string[];
            data.push([
                `${stats.subStat}|zzz/icons/stat-icons/${splitJoin(
                    stats.subStat,
                )}`,
                ...levels.map((_, index) => subStatScaling[index] || 0),
            ]);
        }
    } else if ("critRate" in stats && "am" in stats) {
        data = [
            ["Level", ...levels],
            [
                "Base HP|zzz/icons/stat-icons/HP",
                ...levels.map((_, index) =>
                    (stats.hp[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Base ATK|zzz/icons/stat-icons/ATK",
                ...levels.map((_, index) =>
                    (stats.atk[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Base DEF|zzz/icons/stat-icons/DEF",
                ...levels.map((_, index) =>
                    (stats.def[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Crit Rate|zzz/icons/stat-icons/CRIT_Rate",
                ...levels.map(
                    (_, index) =>
                        `${(stats.critRate[index] || 0).toLocaleString()}%`,
                ),
            ],
            [
                "Crit DMG|zzz/icons/stat-icons/CRIT_DMG",
                ...levels.map(
                    (_, index) =>
                        `${(stats.critDMG[index] || 0).toLocaleString()}%`,
                ),
            ],
            [
                "Anomaly Mastery|zzz/icons/stat-icons/Anomaly_Mastery",
                ...levels.map((_, index) =>
                    (stats.am[index] || 0).toLocaleString(),
                ),
            ],
        ];
    }

    return { levels, data };
}

function getEndfieldStats({
    stats,
    attributes,
}: GetStatsProps<EndfieldStats>): StatsData {
    let levels;
    let data: (string | number)[][] = [];
    if ("DEF" in stats) {
        const formatTitle = (stat: GearStat) => {
            const { title, icon } = gearStats[stat];
            return `${title}|endfield/icons/stat-icons/${icon}`;
        };

        levels = attributes.rarity === 5 ? ["0", "1", "2", "3"] : ["0"];
        data = [
            [
                "Level",
                ...levels.map(
                    (level) => `|endfield/icons/skills/Artifice${level}`,
                ),
            ],
            ...Object.entries(stats).map(([stat, values]) => [
                formatTitle(stat as GearStat),
                ...values.map((value) => `+${value}`),
            ]),
        ];
    } else if ("str" in stats) {
        levels = ["1", "20", "40", "60", "80", "90"];
        data = [
            ["Level", ...levels],
            [
                "HP|endfield/icons/stat-icons/HP",
                ...levels.map((_, index) =>
                    (stats.hp[index] || 0).toLocaleString(),
                ),
            ],
            [
                "ATK|endfield/icons/stat-icons/ATK",
                ...levels.map((_, index) =>
                    (stats.atk[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Strength|endfield/icons/stat-icons/STR",
                ...levels.map((_, index) =>
                    (stats.str[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Agility|endfield/icons/stat-icons/AGI",
                ...levels.map((_, index) =>
                    (stats.agi[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Intellect|endfield/icons/stat-icons/INT",
                ...levels.map((_, index) =>
                    (stats.int[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Will|endfield/icons/stat-icons/WIL",
                ...levels.map((_, index) =>
                    (stats.wil[index] || 0).toLocaleString(),
                ),
            ],
        ];
    } else {
        levels = ["1", "20", "40", "60", "80", "90"];
        data = [
            ["Level", ...levels],
            [
                "Base ATK|endfield/icons/stat-icons/ATK",
                ...levels.map((_, index) =>
                    (
                        endfieldBaseATKScaling[stats.atk][index] || 0
                    ).toLocaleString(),
                ),
            ],
        ];
    }

    return { levels, data };
}

function getNTEStats({
    stats,
    attributes,
}: GetStatsProps<NTEStats>): StatsData {
    let levels = levelData["nte"]("level-asc", attributes.rarity);
    let data: (string | number)[][] = [];
    if ("hp" in stats) {
        data = [
            ["Level", ...levels],
            [
                "Base HP|nte/icons/stat-icons/HP",
                ...levels.map((_, index) =>
                    (stats.hp[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Base ATK|nte/icons/stat-icons/ATK",
                ...levels.map((_, index) =>
                    (stats.atk[index] || 0).toLocaleString(),
                ),
            ],
            [
                "Base DEF|nte/icons/stat-icons/DEF",
                ...levels.map((_, index) =>
                    (stats.def[index] || 0).toLocaleString(),
                ),
            ],
        ];
    } else {
        levels = ["1", "20", "30", "40", "50", "60", "70", "80"];
        data = [
            ["Level", ...levels],
            [
                "Base ATK|nte/icons/stat-icons/ATK",
                ...levels.map((_, index) =>
                    (nteBaseATKScaling[stats.atk][index] || 0).toLocaleString(),
                ),
            ],
        ];
        if (stats.subStat) {
            let subStatScaling = nteSubstats[stats.atk][
                stats.subStat
            ] as string[];
            data.push([
                `${nteSubstatNames[stats.subStat].title}|nte/icons/stat-icons/${splitJoin(
                    stats.subStat,
                )}`,
                ...levels.map((_, index) => subStatScaling[index] || 0),
            ]);
        }
    }

    return { levels, data };
}
