import { range } from "@/utils";

export function zzzLevels(key: string) {
    switch (key) {
        case "level":
            return ["10", "20", "30", "40", "50", "60"];
        case "level-asc":
            return [
                "1",
                "10",
                "10+",
                "20",
                "20+",
                "30",
                "30+",
                "40",
                "40+",
                "50",
                "50+",
                "60",
            ];
        case "skill":
            return range(1, 12);
        case "core-skill":
            return range(1, 7); // ["0", "A", "B", "C", "D", "E", "F"]
        default:
            return [];
    }
}
