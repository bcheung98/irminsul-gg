import levelData from "@/data/levels";
import {
    baseATKScaling as genshinBaseATKScaling,
    subStats,
} from "@/data/genshin/weaponStats";
import { StatsDisplayProps } from "./StatsDisplay.types";
import { characterAscensionStatScalings } from "@/data/genshin/characterAscensionStats";
import { splitJoin } from "@/utils";
import { weaponStats as hsrWeaponStats } from "@/data/hsr/weaponStats";
import { HSRWeaponStats } from "@/types/hsr/weapon";

type Props = Omit<StatsDisplayProps, "game">;
type StatsData = {
    levels: (string | number)[];
    data: (string | number)[][];
};

export function getStats({
    game,
    stats,
    attributes,
}: StatsDisplayProps): StatsData {
    switch (game) {
        case "genshin":
            return getGenshinStats({ stats, attributes });
        case "hsr":
            return getHSRStats({ stats, attributes });
        case "wuwa":
        case "zzz":
        case "uma":
        default:
            return { levels: [], data: [] };
    }
}

function getGenshinStats({ stats, attributes }: Props): StatsData {
    let levels: (string | number)[] = [];
    let data: (string | number)[][] = [];
    if ("ascensionStat" in stats) {
        const { rarity = 4 } = attributes;
        const ascensionStats = characterAscensionStatScalings(
            rarity,
            stats.ascensionStat,
            { em: stats.em }
        );
        const ascStatScaling = !["CRIT Rate", "CRIT DMG"].includes(
            stats.ascensionStat
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
                    (stats.hp[index] || 0).toLocaleString()
                ),
            ],
            [
                "Base ATK|genshin/icons/stat-icons/ATK",
                ...levels.map((_, index) =>
                    (stats.atk[index] || 0).toLocaleString()
                ),
            ],
            [
                "Base DEF|genshin/icons/stat-icons/DEF",
                ...levels.map((_, index) =>
                    (stats.def[index] || 0).toLocaleString()
                ),
            ],
            [
                "CRIT Rate|genshin/icons/stat-icons/CRIT_Rate",
                ...levels.map(
                    (_, index) =>
                        (ascensionStats["CRIT Rate"] &&
                            ascensionStats["CRIT Rate"][index]) ||
                        0
                ),
            ],
            [
                "CRIT DMG|genshin/icons/stat-icons/CRIT_DMG",
                ...levels.map(
                    (_, index) =>
                        (ascensionStats["CRIT DMG"] &&
                            ascensionStats["CRIT DMG"][index]) ||
                        0
                ),
            ],
        ];
        stats.em.reduce((a, c) => a + c) != 0 &&
            stats.ascensionStat !== "Elemental Mastery" &&
            data.push([
                "Elemental Mastery|genshin/icons/stat-icons/Elemental_Mastery",
                ...levels.map((_, index) =>
                    (stats.em[index] || 0).toLocaleString()
                ),
            ]);
        ascStatScaling &&
            data.push([
                `${stats.ascensionStat}|genshin/icons/stat-icons/${splitJoin(
                    stats.ascensionStat
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
                    ).toLocaleString()
                ),
            ],
        ];
        if (stats.subStat) {
            let subStatScaling = subStats[stats.atk][stats.subStat] as string[];
            data.push([
                `${stats.subStat}|genshin/icons/stat-icons/${splitJoin(
                    stats.subStat
                )}`,
                ...levels.map((_, index) => subStatScaling[index] || 0),
            ]);
        }
    }

    return { levels, data };
}

function getHSRStats({ stats }: Props): StatsData {
    const levels = levelData["hsr"]("level-asc");
    let data: (string | number)[][] = [];
    if ("speed" in stats) {
        data = [
            ["Level", ...levels],
            [
                `Base HP|hsr/icons/stat-icons/HP`,
                ...levels.map((_, index) =>
                    (stats.hp[index] || 0).toLocaleString()
                ),
            ],
            [
                `Base ATK|hsr/icons/stat-icons/ATK`,
                ...levels.map((_, index) =>
                    (stats.atk[index] || 0).toLocaleString()
                ),
            ],
            [
                `Base DEF|hsr/icons/stat-icons/DEF`,
                ...levels.map((_, index) =>
                    (stats.def[index] || 0).toLocaleString()
                ),
            ],
            [
                "SPD|hsr/icons/stat-icons/SPD",
                ...levels.map((_, index) =>
                    (stats.speed[index] || 0).toLocaleString()
                ),
            ],
            [
                `Taunt|hsr/icons/stat-icons/Taunt`,
                ...levels.map((_, index) => stats.taunt[index]),
            ],
        ];
    } else {
        const weaponStats = stats as HSRWeaponStats;
        data = [
            ["Level", ...levels],
            [
                `HP|hsr/icons/stat-icons/HP`,
                ...levels.map((_, index) =>
                    (
                        hsrWeaponStats.hp[weaponStats.hp][index] || 0
                    ).toLocaleString()
                ),
            ],
            [
                `ATK|hsr/icons/stat-icons/ATK`,
                ...levels.map((_, index) =>
                    (
                        hsrWeaponStats.atk[weaponStats.atk][index] || 0
                    ).toLocaleString()
                ),
            ],
            [
                `DEF|hsr/icons/stat-icons/DEF`,
                ...levels.map((_, index) =>
                    (
                        hsrWeaponStats.def[weaponStats.def][index] || 0
                    ).toLocaleString()
                ),
            ],
        ];
    }

    return { levels, data };
}
