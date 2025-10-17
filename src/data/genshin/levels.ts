import { range } from "@/utils";

export function genshinLevels(key: string) {
    switch (key) {
        case "level":
            return ["20", "40", "50", "60", "70", "80", "90"];
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
                "80+",
                "90",
            ];
        case "attack":
        case "skill":
        case "burst":
            return range(1, 10);
        default:
            return [];
    }
}
