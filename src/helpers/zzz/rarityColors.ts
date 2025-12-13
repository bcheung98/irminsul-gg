export function getZZZRarityColor(rarity?: number) {
    switch (rarity) {
        case 5:
            return "rgb(255, 181, 0)";
        case 4:
            return "rgb(233, 0, 255)";
        case 3:
            return "rgb(0, 169, 255)";
        case 2:
            return "rgb(125, 168, 155)";
        case 1:
        default:
            return "rgb(175, 175, 175)";
    }
}

export function getZZZBackgroundColor(rarity: number, opacity = 0.45) {
    switch (rarity) {
        case 5:
            return `rgba(255, 199, 129, ${opacity})`;
        case 4:
            return `rgba(193, 153, 253, ${opacity})`;
        case 3:
            return `rgba(115, 176, 244, ${opacity})`;
        case 2:
            return `rgba(167, 197, 188, ${opacity})`;
        case 1:
        default:
            return `rgba(195, 195, 195, ${opacity})`;
    }
}
