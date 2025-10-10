export function getRarityColor(rarity?: number) {
    switch (rarity) {
        case 5:
            return "rgb(255, 208, 112)";
        case 4:
            return "rgb(175, 134, 255)";
        case 3:
            return "rgb(105, 157, 237)";
        case 2:
            return "rgb(104, 211, 145)";
        case 1:
        default:
            return "rgb(175, 175, 175)";
    }
}

export function getBackgroundColor(rarity: number, opacity = 0.45) {
    switch (rarity) {
        case 5:
            return `rgba(255, 199, 129, ${opacity})`;
        case 4:
            return `rgba(193, 153, 253, ${opacity})`;
        case 3:
            return `rgba(115, 176, 244, ${opacity})`;
        case 2:
            return `rgba(114, 169, 156, ${opacity})`;
        case 1:
        default:
            return `rgba(195, 195, 195, ${opacity})`;
    }
}
