import { range } from "@/utils";

export function nteLevels(key: string) {
    switch (key) {
        case "level":
            return ["20", "30", "40", "50", "60", "70", "80"];
        case "level-asc":
            return [
                "1",
                "20",
                "20+",
                "30",
                "30+",
                "40",
                "40+",
                "50",
                "50+",
                "60",
                "60+",
                "70",
                "70+",
                "80",
            ];
        case "attack":
        case "skill":
        case "ultimate":
            return range(1, 10);
        case "life":
            return range(1, 5);
        case "passive1":
        case "passive2":
        default:
            return [];
    }
}
