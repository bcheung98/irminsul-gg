export function formatAptitude(aptitude: string) {
    switch (aptitude) {
        case "Front":
        case "Runner":
            return "Front Runner";
        case "Pace":
        case "Leader":
            return "Pace Chaser";
        case "Late":
        case "Betweener":
            return "Late Surger";
        case "End":
        case "Chaser":
            return "End Closer";
        case "Turf":
        case "Dirt":
        case "Sprint":
        case "Mile":
        case "Medium":
        case "Long":
            return aptitude;
        default:
            return aptitude;
    }
}

export function formatRaceStage(stage: string) {
    switch (stage) {
        case "Early-Race":
        case "Mid-Race":
        case "Late-Race":
        case "Last-Spurt":
        case "Corner":
        case "Straight":
        case "Final Corner":
        case "Final Straight":
        case "Slope":
            return stage;
        default:
            return stage;
    }
}
