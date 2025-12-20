import { range } from "@/utils";

export function hsrLevels(key: string) {
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
        case "memo-skill":
        case "memo-talent":
            return range(1, 6);
        case "skill":
        case "ultimate":
        case "talent":
            return range(1, 10);
        case "trace-main":
        case "trace-small":
        default:
            return [];
    }
}
