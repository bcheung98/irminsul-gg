import { range } from "@/utils";

export function wuwaLevels(key: string, rarity = 5) {
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
        case "forte":
        case "intro":
            return range(1, 10);
        case "passive1":
        case "passive2":
        case "outro":
        default:
            return [];
    }
}
