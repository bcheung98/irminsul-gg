import { range } from "@/utils";

export function endfieldLevels(key: string) {
    switch (key) {
        case "level":
            return ["20", "40", "60", "80", "90"];
        case "level-asc":
            return [
                "1",
                "20",
                "20+",
                "40",
                "40+",
                "60",
                "60+",
                "80",
                "80+",
                "90",
            ];
        case "attack":
        case "skill":
        case "combo":
        case "ultimate":
        case "skillA":
        case "skillB":
            return range(1, 12);
        default:
            return [];
    }
}
