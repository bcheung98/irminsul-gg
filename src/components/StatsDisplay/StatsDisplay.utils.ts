import { StatsDisplayProps } from "./StatsDisplay.types";
import { characterAscensionStatScalings } from "@/app/(games)/genshin/_data/characterAscensionStats";

type Props = Omit<StatsDisplayProps, "game">;
type StatsData = {
    levels: (string | number)[];
    data: (string | number)[][];
};

export function getStats({ stats, attributes }: Props): {
    [key: string]: StatsData;
} {
    return { genshin: getGenshinStats({ stats, attributes }) };
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
                "Base HP|genshin/icons/ascension_stats/HP",
                ...levels.map((_, index) =>
                    (stats.hp[index] || 0).toLocaleString()
                ),
            ],
            [
                "Base ATK|genshin/icons/ascension_stats/ATK",
                ...levels.map((_, index) =>
                    (stats.atk[index] || 0).toLocaleString()
                ),
            ],
            [
                "Base DEF|genshin/icons/ascension_stats/DEF",
                ...levels.map((_, index) =>
                    (stats.def[index] || 0).toLocaleString()
                ),
            ],
            [
                "CRIT Rate|genshin/icons/ascension_stats/CRIT_Rate",
                ...levels.map(
                    (_, index) =>
                        (ascensionStats["CRIT Rate"] &&
                            ascensionStats["CRIT Rate"][index]) ||
                        0
                ),
            ],
            [
                "CRIT DMG|genshin/icons/ascension_stats/CRIT_DMG",
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
                "Elemental Mastery|genshin/icons/ascension_stats/Elemental_Mastery",
                ...levels.map((_, index) =>
                    (stats.em[index] || 0).toLocaleString()
                ),
            ]);
        ascStatScaling &&
            data.push([
                `${
                    stats.ascensionStat
                }|genshin/icons/ascension_stats/${stats.ascensionStat
                    .split(" ")
                    .join("_")}`,
                ...levels.map((_, index) => ascStatScaling[index]),
            ]);
    }

    return { levels, data };
}
