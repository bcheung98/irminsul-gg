export function getEndfieldRarityColor(rarity?: number) {
    switch (rarity) {
        case 6:
            return "rgb(255, 112, 0)";
        case 5:
            return "rgb(255, 186, 3)";
        case 4:
            return "rgb(148, 81, 248)";
        case 3:
            return "rgb(90, 196, 250)";
        case 2:
            return "rgb(173, 200, 71)";
        case 1:
        default:
            return "rgb(154, 154, 154)";
    }
}

export function getEndfieldBackgroundColor(rarity: number, opacity = 0.45) {
    switch (rarity) {
        case 6:
            return `rgba(255, 112, 0, ${opacity})`;
        case 5:
            return `rgba(255, 186, 3, ${opacity})`;
        case 4:
            return `rgba(148, 81, 248, ${opacity})`;
        case 3:
            return `rgba(90, 196, 250, ${opacity})`;
        case 2:
            return `rgba(173, 200, 71, ${opacity})`;
        case 1:
        default:
            return `rgba(174, 174, 174, ${opacity})`;
    }
}
