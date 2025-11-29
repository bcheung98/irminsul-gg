import { range } from "@/utils";

export function genshinLevels(key: string, rarity = 5) {
    switch (key) {
        case "level":
            return rarity > 2
                ? ["20", "40", "50", "60", "70", "80", "90"]
                : ["20", "40", "50", "60", "70"];
        case "level-asc":
            return rarity > 2
                ? [
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
                  ]
                : [
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
                  ];
        case "attack":
        case "skill":
        case "ultimate":
            return range(1, 10);
        default:
            return [];
    }
}
