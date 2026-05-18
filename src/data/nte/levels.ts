import { range } from "@/utils";

export function nteLevels(key: string) {
    switch (key) {
        case "level":
            return ["20", "40", "50", "60", "70", "80"];
        case "level-asc":
            return [
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
            ];
        case "attack":
        case "skill":
        case "ultimate":
            return range(1, 13);
        case "city":
            return range(1, 5);
        default:
            return [];
    }
}
