import { CharacterAscensionStat } from "@/types/genshin/character";

export const characterAscensionStats = {
    "": {
        title: "",
    },
    ATK: {
        title: "ATK%",
    },
    DEF: {
        title: "DEF%",
    },
    HP: {
        title: "HP%",
    },
    "CRIT Rate": {
        title: "CRIT Rate",
    },
    "CRIT DMG": {
        title: "CRIT DMG",
    },
    "Elemental Mastery": {
        title: "Elemental Mastery",
    },
    "Energy Recharge": {
        title: "Energy Recharge",
    },
    "Healing Bonus": {
        title: "Healing Bonus",
    },
    "Physical DMG Bonus": {
        title: "Physical DMG Bonus",
    },
    "Pyro DMG Bonus": {
        title: "Pyro DMG Bonus",
    },
    "Hydro DMG Bonus": {
        title: "Hydro DMG Bonus",
    },
    "Electro DMG Bonus": {
        title: "Electro DMG Bonus",
    },
    "Cryo DMG Bonus": {
        title: "Cryo DMG Bonus",
    },
    "Anemo DMG Bonus": {
        title: "Anemo DMG Bonus",
    },
    "Geo DMG Bonus": {
        title: "Geo DMG Bonus",
    },
    "Dendro DMG Bonus": {
        title: "Dendro DMG Bonus",
    },
};

export const characterAscensionStatScalings = (
    rarity: number,
    ascensionStat: CharacterAscensionStat,
    charStats: {
        em: number[];
    }
) => {
    const stats: Partial<Record<CharacterAscensionStat, string[]>> = {
        "CRIT Rate": [
            "5%",
            "5%",
            "5%",
            "5%",
            "5%",
            "5%",
            "5%",
            "5%",
            "5%",
            "5%",
            "5%",
            "5%",
            "5%",
            "5%",
            "5%",
            "5%",
        ],
        "CRIT DMG": [
            "50%",
            "50%",
            "50%",
            "50%",
            "50%",
            "50%",
            "50%",
            "50%",
            "50%",
            "50%",
            "50%",
            "50%",
            "50%",
            "50%",
            "50%",
            "50%",
        ],
    };
    switch (ascensionStat) {
        case "CRIT Rate":
            stats["CRIT Rate"] = [
                "5%",
                "5%",
                "5%",
                "5%",
                "9.8%",
                "9.8%",
                "14.6%",
                "14.6%",
                "14.6%",
                "14.6%",
                "19.4%",
                "19.4%",
                "24.2%",
                "24.2%",
                "24.2%",
                "24.2%",
            ];
            break;
        case "CRIT DMG":
            stats["CRIT DMG"] = [
                "50%",
                "50%",
                "50%",
                "50%",
                "59.6%",
                "59.6%",
                "69.2%",
                "69.2%",
                "69.2%",
                "69.2%",
                "78.8%",
                "78.8%",
                "88.4%",
                "88.4%",
                "88.4%",
                "88.4%",
            ];
            break;
        case "Elemental Mastery":
            let values: number[];
            if (rarity === 4) {
                values = [
                    0, 0, 0, 0, 24, 24, 48, 48, 48, 48, 72, 72, 96, 96, 96, 96,
                ];
            }
            if (rarity === 5) {
                values = [
                    0, 0, 0, 0, 28, 28, 57, 57, 57, 57, 86, 86, 115, 115, 115,
                    115,
                ];
            }
            stats[ascensionStat] = charStats.em.map((value, index) =>
                (values[index] + value).toString()
            );
            break;
        case "Energy Recharge":
            if (rarity === 4) {
                stats[ascensionStat] = [
                    "0%",
                    "0%",
                    "0%",
                    "0%",
                    "6.7%",
                    "6.7%",
                    "13.3%",
                    "13.3%",
                    "13.3%",
                    "13.3%",
                    "20%",
                    "20%",
                    "26.7%",
                    "26.7%",
                    "26.7%",
                    "26.7%",
                ];
            }
            if (rarity === 5) {
                stats[ascensionStat] = [
                    "0%",
                    "0%",
                    "0%",
                    "0%",
                    "8%",
                    "8%",
                    "16%",
                    "16%",
                    "16%",
                    "16%",
                    "24%",
                    "24%",
                    "32%",
                    "32%",
                    "32%",
                    "32%",
                ];
            }
            break;
        case "Healing Bonus":
            stats[ascensionStat] = [
                "0%",
                "0%",
                "0%",
                "0%",
                "5.5%",
                "5.5%",
                "11.1%",
                "11.1%",
                "11.1%",
                "11.1%",
                "16.6%",
                "16.6%",
                "22.2%",
                "22.2%",
                "22.2%",
                "22.2%",
            ];
            break;
        case "DEF":
        case "Physical DMG Bonus":
            if (rarity === 4) {
                stats[ascensionStat as keyof typeof stats] = [
                    "0%",
                    "0%",
                    "0%",
                    "0%",
                    "7.5%",
                    "7.5%",
                    "15%",
                    "15%",
                    "15%",
                    "15%",
                    "22.5%",
                    "22.5%",
                    "30%",
                    "30%",
                    "30%",
                    "30%",
                ];
            }
            if (rarity === 5) {
                stats[ascensionStat as keyof typeof stats] = [
                    "0%",
                    "0%",
                    "0%",
                    "0%",
                    "9%",
                    "9%",
                    "18%",
                    "18%",
                    "18%",
                    "18%",
                    "27%",
                    "27%",
                    "36%",
                    "36%",
                    "36%",
                    "36%",
                ];
            }
            break;
        case "ATK":
        case "HP":
        case "Pyro DMG Bonus":
        case "Hydro DMG Bonus":
        case "Electro DMG Bonus":
        case "Cryo DMG Bonus":
        case "Anemo DMG Bonus":
        case "Geo DMG Bonus":
        case "Dendro DMG Bonus":
            if (rarity === 4) {
                stats[ascensionStat as keyof typeof stats] = [
                    "0%",
                    "0%",
                    "0%",
                    "0%",
                    "6%",
                    "6%",
                    "12%",
                    "12%",
                    "12%",
                    "12%",
                    "18%",
                    "18%",
                    "24%",
                    "24%",
                    "24%",
                    "24%",
                ];
            }
            if (rarity === 5) {
                stats[ascensionStat as keyof typeof stats] = [
                    "0%",
                    "0%",
                    "0%",
                    "0%",
                    "7.2%",
                    "7.2%",
                    "14.4%",
                    "14.4%",
                    "14.4%",
                    "14.4%",
                    "21.6%",
                    "21.6%",
                    "28.8%",
                    "28.8%",
                    "28.8%",
                    "28.8%",
                ];
            }
            break;
    }
    return stats;
};
